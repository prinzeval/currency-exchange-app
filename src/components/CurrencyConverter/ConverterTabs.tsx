// ConverterTabs.tsx
import React from 'react';
import { TbExchange } from "react-icons/tb";
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { LuChartSpline } from "react-icons/lu";
import { HiMiniBellAlert } from "react-icons/hi2";

interface ConverterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ConverterTabs: React.FC<ConverterTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'convert', label: 'Convert', icon: <TbExchange /> },
    { id: 'send', label: 'Send', icon: <BsFillSendArrowDownFill /> },
    { id: 'charts', label: 'Charts', icon: <LuChartSpline /> },
    { id: 'alerts', label: 'Alerts', icon: <HiMiniBellAlert /> }
  ];

  return (
    <div className="converter-tabs">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="icon">{tab.icon}</span> {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ConverterTabs;