import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TbtiQuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate();

  // API에서 질문 불러오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/tbti/user/questions`
        );
        if (response.data && response.data.data) {
          setQuestions(response.data.data);
        }
      } catch (error) {
        console.error('질문을 불러오는 중 오류:', error);
      }
    };

    fetchQuestions();
  }, []);

  // 옵션 클릭 핸들러
  const handleOptionClick = (answerIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);
  };

  // "다음" 또는 "완료" 버튼 클릭
  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // 완료 → 결과 계산 후 페이지 이동
      const finalResult = calculateResult();
      navigate('/tlog/tbti/test/result', { state: { result: finalResult } });
    }
  };

  // 최종 성향별 점수 계산
  const calculateResult = () => {
    const traitScores = {}; // { 'R-S': { totalWeightedScore: 0, totalWeight: 0 }, ... }

    questions.forEach((question, idx) => {
      const answerIndex = selectedAnswers[idx];
      if (answerIndex === undefined) return;

      const selectedAnswer = question.answers[answerIndex];
      const traitKey = question.categoryIntial;

      // traitKey별 누적 구조 초기화
      if (!traitScores[traitKey]) {
        traitScores[traitKey] = { totalWeightedScore: 0, totalWeight: 0 };
      }

      // (가중치 × percentage) 누적
      traitScores[traitKey].totalWeightedScore += question.weight * selectedAnswer.percentage;
      // 가중치 누적
      traitScores[traitKey].totalWeight += question.weight;
    });

    // 최종 평균 계산
    const finalScores = {};
    for (const trait in traitScores) {
      const { totalWeightedScore, totalWeight } = traitScores[trait];
      finalScores[trait] = Math.round(totalWeightedScore / totalWeight);
    }

    return finalScores;
  };

  // 로딩 중 처리
  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        질문을 불러오는 중...
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-5">
      <div className="w-full max-w-sm flex flex-col gap-5">
        {/* 진행 바 */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex-grow h-1 bg-gray-100 rounded">
            <div
              className="h-full bg-blue-600 rounded"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
              }}
            ></div>
          </div>
          <div className="text-gray-700 text-sm">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        {/* 질문 */}
        <div className="text-xl font-bold text-center mb-8 text-gray-800 whitespace-pre-line">
          {currentQuestion.content}
        </div>

        {/* 답변 옵션 */}
        <div className="flex flex-col gap-3 mt-10">
          {currentQuestion.answers.map((option, index) => (
            <button
              key={index}
              className={`p-4 text-left text-base rounded-lg cursor-pointer ${selectedAnswers[currentQuestionIndex] === index
                  ? 'bg-blue-50'
                  : 'bg-gray-50 hover:bg-gray-100'
                }`}
              onClick={() => handleOptionClick(index)}
            >
              {option.content}
            </button>
          ))}
        </div>

        {/* "다음" 또는 "완료" 버튼 */}
        <button
          className={`mt-40 p-4 w-full rounded-lg text-base cursor-pointer ${selectedAnswers[currentQuestionIndex] !== undefined
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
            }`}
          onClick={handleNextClick}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
        >
          {currentQuestionIndex < questions.length - 1 ? '다음' : '완료'}
        </button>
      </div>
    </div>
  );
}

export default TbtiQuizPage;
