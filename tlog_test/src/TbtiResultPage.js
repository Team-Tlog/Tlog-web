import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './logo.svg';
import storeQrcode from './assets/store_qrcode.svg';
import Iconc from './assets/Iconc.svg';

function TbtiResultPage() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false); // 복사 알림 상태

  const result = location.state?.result || {};
  const orderedTraits = ['S-R', 'E-O', 'L-N', 'A-I'];
  const resultString = orderedTraits
    .map((trait) => {
      const value = result[trait] ?? 50;
      return value.toString().padStart(2, '0');
    })
    .join('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultString).then(() => {
      setCopied(true); // 알림 활성화

      // setTimeout(() => setCopied(false), 1500); // 1.5초 후 알림 숨김
    });
  };


  const tbtiProfiles = {
    SELA: {
      name: '자연 액티비티 플래너',
      description: `자연의 아름다움을 온몸으로 느끼며, 친구들과 함께 꼼꼼히 일정을 세우는 계획적인 여행자예요. 산과 바다, 계곡을 돌며 아침부터 저녁까지 액티비티를 빼곡하게 채우고, 사진도 잊지 않고 남겨요. 패러글라이딩, 자전거 여행, 트레킹 등 몸으로 부딪히며 자연을 만끽하는 스타일이에요. 사람들과 함께하는 대화 속에서 에너지를 얻고, 새로운 액티비티를 찾아가며 여행의 재미를 더합니다.`,
      best: 'RELA (자연 속 사색적 탐험가)',
      worst: 'RONI (도시 즉흥 휴식가)',
    },
    SELI: {
      name: '자연 속 여유 소통가',
      description: `자연을 사랑하지만, 액티비티보다는 친구들과 대화하고 소소한 여유를 함께 나누는 걸 좋아해요. 푸른 숲길을 산책하거나 강가에 앉아 커피를 마시며, 자연 속에서의 여유로움을 즐기는 여행자예요. 꼼꼼하게 일정을 세워, 기다리거나 헤매는 일이 없도록 준비하고, 함께하는 시간을 소중히 여겨요. 시끌벅적하기보단 차분한 대화와 자연의 소리를 함께 느끼며, 그 순간을 오래도록 기억에 담습니다.`,
      best: 'RELI (자연 속 사색적 힐링러)',
      worst: 'RONA (도시 즉흥 사색가)',
    },
    SENA: {
      name: '자연 속 즉흥 탐험가',
      description: `자연에서의 자유로운 탐험을 즐기며, 계획보다는 순간의 설렘을 따라가는 여행자예요. 친구들과 함께라면 어디든 모험을 떠날 수 있어요! 바람에 흩날리는 머리카락과 함께 계곡에서 물놀이를 하고, 갑자기 발견한 숲길로 발길을 돌리기도 해요. 자연 속에서 함께 웃고, 새로운 풍경을 발견할 때마다 친구들과 즉흥적으로 길을 바꾸며 여행을 더욱 빛나게 합니다.`,
      best: 'RENA (자연 속 즉흥 사색가)',
      worst: 'ROLI (도시 속 사색적 힐링러)',
    },
    SENI: {
      name: '자연 속 즉흥 힐링 메이트',
      description: `자연의 소리와 공기 속에서 친구들과 함께 여유를 즐기는 여행자예요. 즉흥적으로 돗자리를 펴고, 나무 그늘 아래에서 웃음꽃을 피우며 편안한 시간을 보내요. '꼭 어디를 가야 한다'는 생각보다는, 순간의 분위기에 따라 친구들과 대화를 나누고, 하늘을 올려다보며 한숨 돌립니다. 바쁜 도시에서 벗어나 자연 속에서 즉흥적으로 찾는 휴식이 이들에게 가장 큰 선물이에요.`,
      best: 'RENI (자연 속 즉흥 휴식가)',
      worst: 'ROLA (도시 속 사색적 탐험가)',
    },
    SOLA: {
      name: '도시의 열정 탐험가',
      description: `도시의 불빛과 열기에 빠져, 친구들과 함께 새로운 경험을 찾아가는 계획형 여행자예요. 유명한 명소부터 숨은 핫플까지, 철저히 정보를 모아 일정표를 짜놓고, 그 계획을 따라 움직이며 도시의 활기를 만끽해요. 쇼핑, 맛집, 전시회, 밤거리 산책까지—도시에서 할 수 있는 모든 활동을 사람들과 함께 즐기며, 여행의 추억을 쌓아가는 타입입니다.`,
      best: 'ROLA (도시 속 사색적 탐험가)',
      worst: 'RENI (자연 속 즉흥 휴식가)',
    },
    SOLI: {
      name: '도시 속 여유 소통가',
      description: `도시의 문화와 풍경을 좋아하지만, 시끌벅적한 일정보다는 친구들과 함께 여유롭게 느끼는 여행을 선호해요. 카페에 앉아 긴 대화를 나누거나, 조용한 골목길을 함께 걸으며 도시의 숨은 매력을 찾아보는 스타일이에요. 계획적으로 동선을 짜서, 불필요한 기다림 없이 편안하게 여행을 이어가는 모습이 매력적입니다.`,
      best: 'ROLI (도시 속 사색적 힐링러)',
      worst: 'RENA (자연 속 즉흥 사색가)',
    },
    SONA: {
      name: '도시 속 즉흥 모험가',
      description: `도시의 골목길과 새로운 가게를 발길 닿는 대로 찾아가는 여행자예요. 친구들과 함께라면 지도 없이도 모험할 수 있죠! 즉흥적으로 작은 공연을 발견하거나, 맛있는 냄새가 나는 가게에 들어가는 걸 망설이지 않아요. 새로운 도시의 매력을, 사람들과 함께 나누며 즐겁게 탐험하는 타입이에요.`,
      best: 'RONA (도시 즉흥 사색가)',
      worst: 'RELI (자연 속 사색적 힐링러)',
    },
    SONI: {
      name: '도시 속 즉흥 힐링 메이트',
      description: `도시의 골목과 카페, 공원에서 친구들과 함께 즉흥적으로 여유를 찾는 여행자예요. '여행은 쉼이다'라는 마음으로, 한적한 카페 창가나 조용한 공원 벤치에서 친구들과 긴 수다를 나누며 힐링해요. 도시의 번잡함 속에서도 소소한 여유를 찾는 게 이 여행자들의 행복입니다.`,
      best: 'RONI (도시 즉흥 휴식가)',
      worst: 'RELA (자연 속 사색적 탐험가)',
    },
    RELA: {
      name: '자연 속 사색적 탐험가',
      description: `자연의 숲길을 따라 혼자서 걸으며, 풍경과 내면의 생각을 함께 탐험하는 여행자예요. 꼼꼼하게 코스를 정리해두고, 계획에 따라 걷지만 그 길 위에서 느끼는 고요함을 가장 소중히 여깁니다. 혼자만의 속도로 자연과 나를 연결하며, 산책과 트레킹을 통해 마음을 비워내고 채워가는 스타일이에요.`,
      best: 'SELA (자연 액티비티 플래너)',
      worst: 'SONI (도시 즉흥 힐링 메이트)',
    },
    RELI: {
      name: '자연 속 사색적 힐링러',
      description: `자연 속에서 혼자 여유롭게 머무르며, 나무 그늘 아래서 책을 읽거나 바람을 느끼는 걸 즐겨요. 계획적으로 찾아온 숲이나 호숫가에서 조용히 나만의 시간을 보내고, 자연의 소리를 음미하는 모습이 편안해 보여요. 세상과 거리를 두고 자연과 하나가 되어, 마음의 평화를 찾습니다.`,
      best: 'SELI (자연 속 여유 소통가)',
      worst: 'SONA (도시 속 즉흥 모험가)',
    },
    RENA: {
      name: '자연 속 즉흥 사색가',
      description: `자연의 향기와 소리를 따라, 즉흥적으로 혼자 길을 바꿔가며 여행을 즐기는 타입이에요. 마음이 이끄는 대로 숲길을 걷거나, 바닷가에 앉아 해가 지는 모습을 오래 바라보기도 해요. 계획 없이 떠나온 여정이지만, 그 안에서 오히려 더 깊이 자신을 마주하는 여행자예요.`,
      best: 'SENA (자연 속 즉흥 탐험가)',
      worst: 'SOLI (도시 속 여유 소통가)',
    },
    RENI: {
      name: '자연 속 즉흥 휴식가',
      description: `자연의 품 안에서 혼자만의 휴식을 찾으며, 즉흥적으로 마음이 끌리는 곳에서 여유를 즐기는 여행자예요. 계곡물에 발을 담그거나, 숲길의 벤치에 앉아 멍하니 바람을 느끼며 머무는 시간이 소중해요. 조용히 자연의 품에 안겨, 그 순간을 감성적으로 기록하는 스타일입니다.`,
      best: 'SENI (자연 속 즉흥 힐링 메이트)',
      worst: 'SOLA (도시의 열정 탐험가)',
    },
    ROLA: {
      name: '도시 속 사색적 탐험가',
      description: `도시의 뒷골목과 박물관을 혼자서 계획적으로 탐방하는 여행자예요. 어디서든 새로운 스폿을 찾아, 조용히 사진을 찍고, 분위기를 음미하며 깊은 생각에 잠기곤 해요. 여행지를 찾고 계획을 세우는 그 과정 자체가 이들에게는 또 하나의 여행이자 즐거움입니다.`,
      best: 'SOLA (도시의 열정 탐험가)',
      worst: 'SENI (자연 속 즉흥 힐링 메이트)',
    },
    ROLI: {
      name: '도시 속 사색적 힐링러',
      description: `도시의 조용한 카페나 서점에서 혼자 여유롭게 시간을 보내며, 나만의 리듬을 찾는 여행자예요. 복잡한 계획보다는, 차분히 계획한 코스를 따라 걷고, 느긋하게 차 한 잔을 즐겨요. 도시의 소리와 색을 조용히 관찰하며, 고요한 힐링을 만끽하는 타입이에요.`,
      best: 'SOLI (도시 속 여유 소통가)',
      worst: 'SENA (자연 속 즉흥 탐험가)',
    },
    RONA: {
      name: '도시 즉흥 사색가',
      description: `도시의 골목과 작은 상점, 공방들을 혼자서 즉흥적으로 탐험하는 여행자예요. 발길 닿는 대로 걷고, 마음이 끌리는 곳에 잠시 머물러 도시의 이야기를 듣고 느끼는 걸 좋아해요. 계획보다는 순간의 감각과 대화를 따라 움직이며, 자신만의 시간을 만들어갑니다.`,
      best: 'SONA (도시 속 즉흥 모험가)',
      worst: 'SELI (자연 속 여유 소통가)',
    },
    RONI: {
      name: '도시 즉흥 휴식가',
      description: `도시의 작은 공원이나 카페에서 혼자 즉흥적으로 여유를 즐기며, 도시의 소음을 배경음악 삼아 멍하니 생각에 잠기곤 해요. 사람들로 북적이는 길거리에서 벗어나, 나만의 아늑한 공간을 찾아 숨 고르는 여행자예요. 여행의 목적은 계획이 아닌, 순간의 여유와 쉼이죠.`,
      best: 'SONI (도시 즉흥 힐링 메이트)',
      worst: 'SELA (자연 액티비티 플래너)',
    },
  };
  const tbtiName = location.state?.tbti || 'RENA';
  const tbti = tbtiProfiles[tbtiName] || {};

  const renderGauge = (trait, score) => {
    const move = score === 50 ? 0 : Math.abs(score - 50);
    const isLeft = score < 50;
    return (
      <div key={trait} className="flex items-center justify-between w-full max-w-xs">
        <span className="text-xs font-medium w-4">{trait[0]}</span>
        <div className="relative flex-grow mx-2 h-2 bg-gray-200 rounded overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5" />
          <div
            className="absolute top-0 bottom-0 bg-blue-600 rounded"
            style={{
              width: `${move}%`,
              [isLeft ? 'right' : 'left']: '50%',
            }}
          ></div>
        </div>
        <span className="text-xs font-medium w-4 text-right">{trait[2]}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 font-sans">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-4" />
      <h1 className="text-2xl font-bold text-black mb-2">{tbtiName}</h1>
      <p className="text-sm text-gray-700 mb-6">{tbti.name}</p>

      <div className="w-full max-w-xs space-y-4 mb-6">
        {orderedTraits.map((trait) => renderGauge(trait, result[trait] ?? 50))}
      </div>

      <div className="w-full max-w-xs bg-white-50 rounded-lg p-4 mb-6">
        <p className="text-xs text-gray-700 leading-relaxed text-left indent-1">
          {tbti.description}
        </p>
      </div>

      <div className="w-full max-w-xs flex justify-between mb-6">
        <div className="flex-1 flex flex-col items-center bg-gray-100 rounded-xl p-3 mx-1">
          <p className="text-sm font-semibold mb-2">잘 맞는 TBTI</p>
          <img src={logo} alt="결과 아이콘" className="w-15 h-15 mb-2" />
          <div className="text-xs text-center">
            <div className="font-medium">{tbti.best?.split(' ')[0]}</div>
            <div className="mt-1">{tbti.best?.split(' ').slice(1).join(' ')}</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center bg-gray-100 rounded-xl p-3 mx-1">
          <p className="text-sm font-semibold mb-2">안 맞는 TBTI</p>
          <img src={logo} alt="결과 아이콘" className="w-15 h-15 mb-2" />
          <div className="text-xs text-center">
            <div className="font-medium">{tbti.worst?.split(' ')[0]}</div>
            <div className="mt-1">{tbti.worst?.split(' ').slice(1).join(' ')}</div>
          </div>
        </div>
      </div>

      {/* 코드 복사 + 알림 메시지 */}
      <div className="text-base font-semibold text-gray-800 mb-6 flex flex-col items-center space-y-1">
        <div className="flex items-center space-x-2">
          <span>코드 : {resultString}</span>
          <button
            className="flex items-center justify-center w-6 h-6"
            onClick={copyToClipboard}
          >
            <img src={Iconc} alt="복사" className="w-4 h-4" />
          </button>
        </div>
        {copied && (
          <p className="text-xs text-green-500">코드가 복사되었습니다!</p>
        )}
      </div>

      {/* Tlog 시작하기 버튼: 코드 복사 */}
      <a
        href="https://play.google.com/store/search?q=tlog&c=apps&hl=ko"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-xs bg-indigo-600 text-white py-3 rounded-full text-base font-semibold hover:bg-indigo-700 transition flex items-center justify-center"
        onClick={(e) => {
          copyToClipboard();
        }}
      >
        Tlog 시작하기
      </a>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              &#10005;
            </button>
            {copied && (
              <p className="text-xs text-green-500 mb-2">코드가 복사되었습니다!</p>
            )}
            <img src={storeQrcode} alt="QR코드" className="mb-4 w-full rounded" />
            <p className="text-sm text-gray-800 mb-4">Tlog 여행을 떠나볼까요?</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TbtiResultPage;