import React from 'react';
import { useNavigate } from 'react-router-dom';

function TlogStartPage() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/tlog/tbti/test');
  };

  const handleSkip = () => {
    alert('건너뛰기 버튼이 클릭되었습니다. 다른 페이지로 이동합니다.');
    // In a real application, you would use:
    // navigate('/next-page');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-xs flex flex-col justify-start items-center pt-36 px-5 h-[667px] bg-white">
        <div className="text-center flex flex-col justify-start items-center w-full max-w-xs mx-auto">
          <h1 className="text-2xl font-bold mb-8">TBTI를 아시나요?</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-2">데드 증권 관련해 맞는 어떠한 용기가 가능하다?</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-2">저희 서비스 이용하시면 안정적으로 재테크 할</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-2">수있도록 다양한 제품 업데이트 하고있습니다</p>
          <button 
            className="w-full bg-indigo-600 text-white border-none py-4 px-4 rounded-lg text-base font-medium cursor-pointer mt-10 hover:bg-indigo-700"
            onClick={handleStartTest}
          >
            테스트 시작
          </button>

          <div className="flex justify-center text-sm text-gray-500 mt-6">
          <span>이미 테스트를 진행하셨나요?</span>
          <button
            onClick={handleSkip}
            className="ml-1 text-blue-500 hover:text-blue-700 font-medium"
          >
            건너뛰기
          </button>
          </div>

          {/* <p className="text-xs text-gray-400 mt-2 text-center">서비스 이용약관 | 개인정보</p> */}
          {/* <p className="text-xs text-gray-400 mt-2 text-center">이미 테스트를 진행하셨나요?</p> */}
        </div>
      </div>
    </div>
  );
}

export default TlogStartPage;