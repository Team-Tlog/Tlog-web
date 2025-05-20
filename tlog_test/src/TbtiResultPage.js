import React from 'react';
import logo from './logo.svg'

function TbtiResultPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 font-sans">
        {/* Image */}
        <img src={logo} alt="Logo" className="w-32 h-32 mb-4" />
      {/* Title */}
      <h1 className="text-2xl font-bold text-black mb-2">RENA</h1>
      <p className="text-sm text-gray-700 mb-6">안정적인 자연 탐험가</p>

      {/* Personality Bars */}
      <div className="w-full max-w-xs space-y-4 mb-6">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-xs font-medium">R</span>
            <div className="flex-grow mx-2 h-1 bg-gray-200 rounded">
              <div className="h-full w-1/2 bg-blue-600 rounded"></div>
            </div>
            <span className="text-xs font-medium">R</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="text-xs text-gray-700 leading-relaxed mb-6 text-center">
        RENA는 ○○을 중요하게 생각하고, 여행할 때 자연을 좋아해요. <br />
        그래서 약속 안지키는 친구와 여행계획이 너무 힘들어요. <br />
        이야아아아오오오우우우우우으아아아아아아아아아아아아우우우우우우우우우우우우우우우우우오이이이이이이이이이이이이이이이이
        {/* 실제 서비스에서는 이 부분을 서버에서 받아오는 성격 분석 텍스트로 바꾸세요 */}
      </div>

      {/* TBTI match blocks */}
      <div className="w-full max-w-xs flex justify-between mb-6">
        <div className="flex-1 flex flex-col items-center bg-gray-100 rounded-xl p-3 mx-1">
          <p className="text-sm font-semibold mb-2">잘 맞는 TBTI</p>
          <div className="w-20 h-24 bg-gray-300 rounded-md" />
        </div>
        <div className="flex-1 flex flex-col items-center bg-gray-100 rounded-xl p-3 mx-1">
          <p className="text-sm font-semibold mb-2">안 맞는 TBTI</p>
          <div className="w-20 h-24 bg-gray-300 rounded-md" />
        </div>
      </div>

      {/* Start Button */}
      <button className="w-full max-w-xs bg-indigo-600 text-white py-3 rounded-full text-base font-semibold hover:bg-indigo-700 transition">
        Tlog 시작하기
      </button>
    </div>
  );
}

export default TbtiResultPage;
