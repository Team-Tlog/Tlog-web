import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './logo.svg';

function TbtiResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || 'XXXX';
  const counts = location.state?.counts || {};

  const tbtiProfiles = {
  SELA: {
    name: 'SELA',
    title: '안정적인 자연 탐험가',
    description: `RENA는 계획적이고 자연을 사랑하는 타입이에요. 
예측 가능한 여행을 좋아하고, 무계획은 스트레스를 유발해요.`,
    best: 'INFP',
    worst: 'ENFP',
  },
  SELI: {
    name: 'SELI',
    title: '액티비티 마스터',
    description: `JAX는 움직이지 않으면 심심한 타입! 
레포츠, 익스트림, 새로운 경험에 열정적이에요.`,
    best: 'ISFJ',
    worst: 'INFJ',
  },
  SENA: {
    name: 'SENA',
    title: '다정한 일정 플래너',
    description: `LIA는 모두가 즐거운 여행을 만들고 싶어해요. 
계획을 잘 세우고, 모두를 배려하며 움직여요.`,
    best: 'ISFP',
    worst: 'INTP',
  },
  SENI: {
    name: 'SENI',
    title: '즉흥 모험가',
    description: `NOVA는 현지 축제, 인생샷 스팟을 즐기는 타입!
즉흥적이고 재밌는 순간을 놓치지 않아요.`,
    best: 'ISTJ',
    worst: 'INTJ',
  },
  SOLA: {
    name: 'SOLA',
    title: '리더십 투어리더',
    description: `KAI는 효율과 성과 중심의 여행을 선호해요. 
계획도 빠르게 세우고 리더 역할도 척척!`,
    best: 'INFP',
    worst: 'ISFP',
  },
  SOLI: {
    name: 'SOLI',
    title: '아이디어 뱅크 여행자',
    description: `RICO는 새로운 것에 대한 호기심이 가득!
계획보단 영감과 즉흥이 중요해요.`,
    best: 'ISFJ',
    worst: 'ISTJ',
  },
  SONA: {
    name: 'SONA',
    title: '인간관계형 여행 큐레이터',
    description: `SOO는 사람들과의 조화를 중시해요. 
누가 힘들어하는지 살피고 모두가 만족하는 여행을 만들어요.`,
    best: 'INFP',
    worst: 'ISTP',
  },
  SONI: {
    name: 'SONI',
    title: '감성 폭발 여행러',
    description: `MILO는 감성적이고 즉흥적인 여행을 좋아해요. 
길을 걷다 만난 고양이랑 놀다가 하루가 지나가요.`,
    best: 'ISFJ',
    worst: 'ESTJ',
  },
  RELA: {
    name: 'RELA',
    title: '정석 플래너',
    description: `ORIN은 디테일한 일정과 안정감을 추구해요. 
계획대로 움직이지 않으면 불편함을 느낄 수 있어요.`,
    best: 'ESFP',
    worst: 'ENFP',
  },
  RELI: {
    name: 'RELI',
    title: '솔로 여행 장인',
    description: `DEX는 혼자만의 여행을 즐길 줄 아는 사람! 
복잡한 일정보단 내 방식대로 움직이는 걸 선호해요.`,
    best: 'ENFJ',
    worst: 'ESFJ',
  },
  RENA: {
    name: 'RENA',
    title: '배려심 깊은 동행자',
    description: `ELLA는 함께하는 사람들을 챙기며 조용히 리드해요. 
너무 즉흥적인 일정은 피곤함을 줄 수 있어요.`,
    best: 'ESFP',
    worst: 'ENTP',
  },
  RENI: {
    name: 'RENI',
    title: '감성 자연인',
    description: `NIA는 숲속 산책과 조용한 해변을 좋아해요. 
자연 속에서 여유를 찾는 힐링 여행이 딱이에요.`,
    best: 'ESTJ',
    worst: 'ENTJ',
  },
  ROLA: {
    name: 'ROLA',
    title: '전략적 탐험가',
    description: `LYON은 여행에서도 전략적으로 움직여요. 
혼자만의 깊은 시간을 중요하게 생각해요.`,
    best: 'ENFP',
    worst: 'ESFP',
  },
  ROLI: {
    name: 'ROLI',
    title: '지적 호기심 여행가',
    description: `THEO는 유적지, 박물관 등 지식 기반의 여행지를 좋아해요. 
즉흥적인 여행은 부담스러울 수 있어요.`,
    best: 'ESFJ',
    worst: 'ESFP',
  },
  RONA: {
    name: 'RONA',
    title: '내면의 평화 여행자',
    description: `RONA은 조용하고 의미 있는 여행을 선호해요. 
번잡한 도시보다는 영감을 주는 장소를 찾아요.`,
    best: 'ENFP',
    worst: 'ESTP',
  },
  RONI: {
    name: 'RONI',
    title: '감성 힐링러',
    description: `ARIN은 감성적인 공간과 감동적인 순간을 중요하게 생각해요. 
자연 속에서 잔잔한 시간을 보내는 걸 좋아해요.`,
    best: 'ENFJ',
    worst: 'ESTJ',
  },
};

const profile = tbtiProfiles[result] || tbtiProfiles['XXXX'];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 font-sans">
      {/* 로고 */}
      <img src={logo} alt="Logo" className="w-32 h-32 mb-4" />

      {/* 결과 제목 */}
      <h1 className="text-2xl font-bold text-black mb-2">{profile.name}</h1>
      <p className="text-sm text-gray-700 mb-6">{profile.title}</p>

      {/* Personality Bars */}
      <div className="w-full max-w-xs space-y-4 mb-6">
        {[
          ['R', 'S'],
          ['E', 'O'],
          ['L', 'N'],
          ['A', 'I'],
        ].map(([a, b], i) => {
          const countA = counts[a] || 0;
          const countB = counts[b] || 0;
          const total = countA + countB || 1;
          const percent = Math.round((Math.max(countA, countB) / total) * 100);
          const isA = countA >= countB;

          return (
            <div key={i} className="flex items-center justify-between">
              <span className="text-xs font-medium w-5">{a}</span>
              <div className="relative flex-grow mx-2 h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className={`absolute top-0 bottom-0 bg-blue-600 transition-all duration-300`}
                  style={{
                    width: `${percent / 2}%`,
                    left: '50%',
                    transform: isA ? 'translateX(-100%)' : 'translateX(0%)',
                  }}
                />
              </div>
              <span className="text-xs font-medium w-5">{b}</span>
            </div>
          );
        })}
      </div>

      {/* 설명 */}
      <div className="text-xs text-gray-700 leading-relaxed mb-6 text-center whitespace-pre-line">
        {profile.description}
      </div>

      {/* 잘 맞는 / 안 맞는 TBTI */}
      <div className="w-full max-w-xs flex justify-between mb-6">
        <div className="flex-1 flex flex-col items-center bg-gray-100 rounded-xl p-3 mx-1">
          <p className="text-sm font-semibold mb-2">잘 맞는 TBTI</p>
          <div className="w-20 h-24 bg-gray-300 rounded-md flex items-center justify-center text-sm font-bold">
            {profile.best}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center bg-gray-100 rounded-xl p-3 mx-1">
          <p className="text-sm font-semibold mb-2">안 맞는 TBTI</p>
          <div className="w-20 h-24 bg-gray-300 rounded-md flex items-center justify-center text-sm font-bold">
            {profile.worst}
          </div>
        </div>
      </div>

      {/* 다시 시작 버튼 */}
      <button
        className="w-full max-w-xs bg-indigo-600 text-white py-3 rounded-full text-base font-semibold hover:bg-indigo-700 transition"
        onClick={() => navigate('/tlog')}
      >
        Tlog 시작하기
      </button>
    </div>
  );
}

export default TbtiResultPage;