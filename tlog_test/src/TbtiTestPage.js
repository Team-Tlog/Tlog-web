import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: '여행지를 고를 때 나는?',
    options: [
      '블로그 유튜브 다 뒤져서 검증된 곳을 찾는다.',
      '남들이 잘 모르는 숨은 보석 같은 곳을 찾는다',
    ],
  },
  {
    question: '여행 중 출렁다리를 갔는데 친구가 옆에서 넌 절대 못건넌다고 비웃는다 이 때 내 행동은?',
    options: [
      '쿨한 인정, 깔끔하게 포기한다.',
      '못건너도 고! 도전해본다.',
    ],
  },
  {
    question: '친구가 "저기 골목 안에 숨겨진 카페가 있다는데?" 했을 때,',
    options: [
      '완전 좋아! 모험 고고!',
      '음... 리뷰부터 찾아보고 결정하자.',
    ],
  },
  {
    question: '어느 날 꿈에서 내가 가장 좋아하는 여행지로 여행을 왔다. 그 장소는?',
    options: [
      '바다와 산이 공존하는 대자연',
      '프랑스 파리 한가운데',
    ],
  },
  {
    question: '어느 날 꿈에서 내가 가장 좋아하는 여행지로 여행을 왔다. 그 장소는?',
    options: [
      '바다와 산이 공존하는 대자연',
      '낭만이 넘치는 상젤리에 거리',
    ],
  },
  {
    question: '여행지에서 제일 먼저 찍고 싶은 인생샷은?',
    options: [
      '멋진 자연 풍경과 함께 한 컷!',
      '반짝이는 도시에서 세련된 야경과 함께 한 컷!',
    ],
  },
  {
    question: '여행 중 갑자기 현지 축제를 발견했다면?',
    options: [
      '일정 체크... 가능하면 맞춰보고, 아니면 패스.',
      '바로 달려간다! 이런 게 진짜 여행이지!',
    ],
  },
  {
    question: '여행 일정을 짤 때 나는?',
    options: [
      '세세하게 계획 짜고 예약까지 이미 완료! 변수 발생 시 플랜 B까지 준비 완료!',
      '큰 틀만 잡고 가자!',
    ],
  },
  {
    question: '여행 중 갑자기 비가 온다. 내 선택은?',
    options: [
      '그럴 일 없어 이미 다 확인하고 왔다. (미리 준비한 실내 코스로 !!)',
      '비맞아도 괜찮아. 즉흥적으로 다녀보자.',
    ],
  },
  {
    question: '여행을 시작할 때, ',
    options: [
      '몇 시에 출발하고, 어디 들를지 시간표까지 짜놓는다.',
      '일단 떠나고 나서 결정한다. 길이 부르는 대로!',
    ],
  },
  {
    question: '여행지에 도착했다 당신의 선택은?',
    options: [
      '여행왔으면 다리를 멈추면 안돼!',
      '여행은 힐링이지 느긋하게 가자~ ',
    ],
  },

  {
    question: '여행지에서의 하루를 상상하면?',
    options: [
      '액티비티 가득! 레일바이크, 트레킹 다 해보자!',
      '느긋하게 카페에서 커피 한 잔 하면서 힐링하자!',
    ],
  },
  {
    question: '여행 중 하루가 비어 있을 때,',
    options: [
      '근처 명소나 체험을 찾아서 꼭 무언가를 한다.',
      '숙소나 카페에서 여유롭게 쉬면서 시간을 보낸다.',
    ],
  },
  {
    question: '여행지에서 선택해야 한다면,',
    options: [
      '액티비티(등산, 서핑, 투어 등)를 즐긴다.',
      '스파, 독서, 호캉스처럼 편안한 시간을 보낸다.',
    ],
  },
  {
    question: '마지막 날 남은 시간이 2시간!! 나의 선택은?',
    options: [
      '최대한 다 돌아보고 가야 해!! 언능 움직이자!',
      '그냥 벤치에 앉아서 여유를 즐기자!',
    ],
  },
  {
    question: '숙소 체크인 후 제일 먼저 하는 일은?',
    options: [
      '가방 던지고 바로 나간다',
      '침대에 푹 파묻힌다',
    ],
  },
];

function TbtiQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    if (selectedOption !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        navigate('/tlog/tbti/test/result');
      }
    }
  };

  // const handleNextClick = () => {
  //   if (selectedOption !== null) {
  //     if (currentQuestionIndex < questions.length - 1) {
  //       setCurrentQuestionIndex((prev) => prev + 1);
  //       setSelectedOption(null); // 다음 질문으로 갈 때 선택 초기화
  //     } else {
  //       alert('테스트가 완료되었습니다!');
  //       // TODO: 결과 페이지로 이동하거나 결과 저장
  //     }
  //   }
  // };

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
              {option}
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
