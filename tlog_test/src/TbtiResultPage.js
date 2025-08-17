import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './logo.svg';
import storeQrcode from './assets/store_qrcode.svg';
import Iconc from './assets/Iconc.svg';

import RELA from './assets/RELA.svg';
import RELI from './assets/RELI.svg';
import RENA from './assets/RENA.svg';
import RENI from './assets/RENI.svg';
import ROLA from './assets/ROLA.svg';
import ROLI from './assets/ROLI.svg';
import RONA from './assets/RONA.svg';
import RONI from './assets/RONI.svg';
import SELA from './assets/SELA.svg';
import SELI from './assets/SELI.svg';
import SENA from './assets/SENA.svg';
import SENI from './assets/SENI.svg';
import SOLA from './assets/SOLA.svg';
import SOLI from './assets/SOLI.svg';
import SONA from './assets/SONA.svg';
import SONI from './assets/SONI.svg';

function TbtiResultPage() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tbtiProfile, setTbtiProfile] = useState(null);
  const [preferredProfile, setPreferredProfile] = useState(null);
  const [notPreferredProfile, setNotPreferredProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const result = location.state?.result || {};
  
  // 코드에서 TBTI 변환하는 함수
  const convertCodeToTbti = (resultData) => {
    const orderedPairs = [
      ['R', 'S'],
      ['E', 'O'], 
      ['N', 'L'],
      ['A', 'I']
    ];
    
    let tbti = '';
    orderedPairs.forEach(([left, right]) => {
      const value = resultData[`${left}-${right}`] ?? 50;
      // 50 이상이면 오른쪽 문자, 미만이면 왼쪽 문자
      tbti += value >= 50 ? right : left;
    });
    
    return tbti;
  };

  // result 데이터가 있으면 코드로부터 TBTI 계산, 없으면 기본값
  const tbtiName = Object.keys(result).length > 0 
    ? convertCodeToTbti(result) 
    : (location.state?.tbti || 'SOLI');

  const tbtiImages = {
    RELA: RELA,
    RELI: RELI,
    RENA: RENA,
    RENI: RENI,
    ROLA: ROLA,
    ROLI: ROLI,
    RONA: RONA,
    RONI: RONI,
    SELA: SELA,
    SELI: SELI,
    SENA: SENA,
    SENI: SENI,
    SOLA: SOLA,
    SOLI: SOLI,
    SONA: SONA,
    SONI: SONI,
  };

  const orderedTraitPairs = [
    ['R', 'S'],
    ['E', 'O'],
    ['N', 'L'],
    ['A', 'I']
  ];

  // API 호출 함수
  const fetchTbtiProfile = async (tbti) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tbti-info?tbti=${tbti}`);
      if (!response.ok) {
        throw new Error('TBTI 정보를 가져오는데 실패했습니다.');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('API 호출 오류:', error);
      throw error;
    }
  };

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const loadTbtiData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 현재 TBTI 정보 가져오기
        const currentProfile = await fetchTbtiProfile(tbtiName);
        setTbtiProfile(currentProfile);

        // 잘 맞는 TBTI와 안 맞는 TBTI 정보도 가져오기
        const [preferred, notPreferred] = await Promise.all([
          fetchTbtiProfile(currentProfile.preferredTbti),
          fetchTbtiProfile(currentProfile.notPreferredTbti)
        ]);

        setPreferredProfile(preferred);
        setNotPreferredProfile(notPreferred);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTbtiData();
  }, [tbtiName]);

  const resultString = orderedTraitPairs
    .map(([left, right]) => {
      const value = result[`${left}-${right}`] ?? 50;
      return value.toString().padStart(2, '0');
    })
    .join('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultString).then(() => {
      setCopied(true);
    });
  };

  const MainColor = '#3B3BFB';
  const GrayColor = '#E0E0E0';

  // 현재 TBTI에 맞는 이미지 가져오기
  const currentTbtiImage = tbtiImages[tbtiName] || logo;
  
  // TBTI 이미지 가져오기
  const getBestTbtiImage = () => {
    return tbtiImages[preferredProfile?.tbtiString] || logo;
  };
  
  const getWorstTbtiImage = () => {
    return tbtiImages[notPreferredProfile?.tbtiString] || logo;
  };

  const renderStyledProgress = (left, right, value) => {
    const clampedValue = Math.max(0, Math.min(value, 99)); // 0~99로 제한
    const percentage = (clampedValue / 99) * 100;
  
    const isRightDominant = percentage >= 50;
  
    const leftColor = !isRightDominant ? MainColor : '#989898';
    const rightColor = isRightDominant ? MainColor : '#989898';
  
    const progressColor = MainColor;
    const trackColor = GrayColor;
  
    const progressPercentage = isRightDominant ? percentage : 100 - percentage;
  
    return (
      <div key={`${left}-${right}`} className="flex items-center justify-center w-full max-w-md px-6 py-2">
        <span className="text-sm font-semibold mr-4" style={{ color: leftColor }}>{left}</span>
        <div className="relative w-full h-2 rounded-full overflow-hidden mx-2">
          <div className="w-full h-full rounded-full" style={{ backgroundColor: trackColor }}></div>
          <div
            className="absolute top-0 bottom-0 rounded-full"
            style={{
              backgroundColor: progressColor,
              width: `${progressPercentage}%`,
              left: isRightDominant ? 'auto' : 0,
              right: isRightDominant ? 0 : 'auto',
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
        <span className="text-sm font-semibold ml-4" style={{ color: rightColor }}>{right}</span>
      </div>
    );
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-lg text-gray-600">TBTI 정보를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-lg text-red-600 text-center">
          <p>오류가 발생했습니다.</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!tbtiProfile) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-lg text-gray-600">TBTI 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 font-sans max-w-md mx-auto">
      {/* 캐릭터 이미지와 타이틀 */}
      <div className="flex flex-col items-center mb-6 mt-8">
        <img src={currentTbtiImage} alt={`${tbtiName} 이미지`} className="w-40 h-40 mb-4" />
        <h1 className="text-3xl font-bold text-black mb-2">{tbtiProfile.tbtiString}</h1>
        <p className="text-base text-gray-600 mb-4">{tbtiProfile.secondName}</p>
      </div>

      {/* 성향 바 */}
      <div className="w-full flex justify-center mb-6">
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          {orderedTraitPairs.map(([left, right]) => {
            const value = result[`${left}-${right}`] ?? 50;
            return renderStyledProgress(left, right, value);
          })}
        </div>
      </div>

      {/* 설명 */}
      <div className="w-full bg-white rounded-lg p-6 mb-8">
        <p className="text-sm text-gray-700 leading-relaxed text-left">
          {tbtiProfile.description}
        </p>
      </div>

      {/* 잘 맞는/안 맞는 TBTI */}
      <div className="w-full mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-semibold mb-3 text-gray-700">최고의 궁합</p>
            <img src={getBestTbtiImage()} alt="최고의 궁합" className="w-16 h-16 mb-3" />
            <div className="text-center">
              <div className="font-bold text-base" style={{ color: MainColor }}>{preferredProfile?.tbtiString}</div>
              <div className="text-xs text-gray-600 mt-1">{preferredProfile?.secondName}</div>
            </div>
          </div>
          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-semibold mb-3 text-gray-700">최악의 궁합</p>
            <img src={getWorstTbtiImage()} alt="최악의 궁합" className="w-16 h-16 mb-3" />
            <div className="text-center">
              <div className="font-bold text-base" style={{ color: MainColor }}>{notPreferredProfile?.tbtiString}</div>
              <div className="text-xs text-gray-600 mt-1">{notPreferredProfile?.secondName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 코드 복사 */}
      <div className="mb-6 flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-base font-medium text-gray-800">코드 : {resultString}</span>
          <button
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors"
            onClick={copyToClipboard}
          >
            <img src={Iconc} alt="복사" className="w-5 h-5" />
          </button>
        </div>
        {copied && <p className="text-sm text-green-600">코드가 복사되었습니다!</p>}
      </div>

      {/* Tlog 시작 버튼 */}
      <a
        href="https://play.google.com/store/search?q=tlog&c=apps&hl=ko"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-white py-4 rounded-2xl text-lg font-bold hover:opacity-90 transition flex items-center justify-center"
          style={{ backgroundColor: '#4F46E5' }}
          onClick={copyToClipboard}
      >
        시작하기
      </a>

      {/* QR코드 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              &#10005;
            </button>
            {copied && <p className="text-xs text-green-500 mb-2">코드가 복사되었습니다!</p>}
            <img src={storeQrcode} alt="QR코드" className="mb-4 w-full rounded" />
            <p className="text-sm text-gray-800 mb-4">Tlog 여행을 떠나볼까요?</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TbtiResultPage;