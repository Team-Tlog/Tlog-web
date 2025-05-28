import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: '여행지를 고를 때 나는?',
    options: [
      { text: '블로그 유튜브 다 뒤져서 검증된 곳을 찾는다.', type: 'R' },
      { text: '남들이 잘 모르는 숨은 보석 같은 곳을 찾는다', type: 'S' },
    ],
  },
  {
    question: '여행 중 출렁다리를 갔는데 친구가 옆에서 넌 절대 못건넌다고 비웃는다 이 때 내 행동은?',
    options: [
      { text: '쿨한 인정, 깔끔하게 포기한다.', type: 'R' },
      { text: '못건너도 고! 도전해본다.', type: 'S' },
    ],
  },
  {
    question: '친구가 "저기 골목 안에 숨겨진 카페가 있다는데?" 했을 때,',
    options: [
      { text: '완전 좋아! 모험 고고!', type: 'S' },
      { text: '음... 리뷰부터 찾아보고 결정하자.', type: 'R' },
    ],
  },
  {
    question: '어느 날 꿈에서 내가 가장 좋아하는 여행지로 여행을 왔다. 그 장소는?',
    options: [
      { text: '바다와 산이 공존하는 대자연', type: 'E' },
      { text: '프랑스 파리 한가운데', type: 'O' },
    ],
  },
  {
    question: '여행지에서 제일 먼저 찍고 싶은 인생샷은?',
    options: [
      { text: '멋진 자연 풍경과 함께 한 컷!', type: 'E' },
      { text: '반짝이는 도시에서 세련된 야경과 함께 한 컷!', type: 'O' },
    ],
  },
  {
    question: '여행 중 갑자기 현지 축제를 발견했다면?',
    options: [
      { text: '일정 체크... 가능하면 맞춰보고, 아니면 패스.', type: 'L' },
      { text: '바로 달려간다! 이런 게 진짜 여행이지!', type: 'N' },
    ],
  },
  {
    question: '여행 일정을 짤 때 나는?',
    options: [
      { text: '세세하게 계획 짜고 예약까지 이미 완료!', type: 'L' },
      { text: '큰 틀만 잡고 가자!', type: 'N' },
    ],
  },
  {
    question: '여행 중 갑자기 비가 온다. 내 선택은?',
    options: [
      { text: '이미 다 확인하고 왔다. 실내 코스로!', type: 'L' },
      { text: '비맞아도 괜찮아. 즉흥적으로 다녀보자.', type: 'N' },
    ],
  },
  {
    question: '여행을 시작할 때, ',
    options: [
      { text: '몇 시에 출발하고 시간표까지 짜놓는다.', type: 'L' },
      { text: '일단 떠나고 나서 결정한다.', type: 'N' },
    ],
  },
  {
    question: '여행지에 도착했다 당신의 선택은?',
    options: [
      { text: '여행왔으면 다리를 멈추면 안돼!', type: 'A' },
      { text: '여행은 힐링이지 느긋하게 가자~', type: 'I' },
    ],
  },
  {
    question: '여행지에서의 하루를 상상하면?',
    options: [
      { text: '액티비티 가득! 레일바이크, 트레킹 다 해보자!', type: 'A' },
      { text: '느긋하게 카페에서 커피 한 잔 하면서 힐링하자!', type: 'I' },
    ],
  },
  {
    question: '마지막 날 남은 시간이 2시간!! 나의 선택은?',
    options: [
      { text: '최대한 다 돌아보고 가야 해!! 언능 움직이자!', type: 'A' },
      { text: '그냥 벤치에 앉아서 여유를 즐기자!', type: 'I' },
    ],
  },
];

function calculateResult(answers) {
  const counts = {};
  answers.forEach((type) => {
    counts[type] = (counts[type] || 0) + 1;
  });

  const pairs = [
    ['R', 'S'],
    ['E', 'O'],
    ['L', 'N'],
    ['A', 'I'],
  ];

  let result = '';
  pairs.forEach(([a, b]) => {
    const countA = counts[a] || 0;
    const countB = counts[b] || 0;
    result += countA >= countB ? a : b;
  });

  return { result, counts };
}

function TbtiQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleNextClick = () => {
    if (selectedOption !== null) {
      const selectedType = currentQuestion.options[selectedOption].type;
      const updatedAnswers = [...answers, selectedType];

      if (currentQuestionIndex < questions.length - 1) {
        setAnswers(updatedAnswers);
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        const { result, counts } = calculateResult(updatedAnswers);
        navigate('/tlog/tbti/test/result', { state: { result, counts } });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-5">
      <div className="w-full max-w-sm flex flex-col gap-5">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex-grow h-1 bg-gray-100 rounded">
            <div
              className="h-full bg-blue-600 rounded"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-gray-700 text-sm">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        {/* Question */}
        <div className="text-xl font-bold text-center mb-8 text-gray-800 whitespace-pre-line">
          {currentQuestion.question}
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mt-10">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`p-4 text-left text-base rounded-lg cursor-pointer ${
                selectedOption === index ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          className={`mt-40 p-4 w-full rounded-lg text-base cursor-pointer ${
            selectedOption !== null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleNextClick}
        >
          {currentQuestionIndex < questions.length - 1 ? '다음' : '완료'}
        </button>
      </div>
    </div>
  );
}

export default TbtiQuizPage;
