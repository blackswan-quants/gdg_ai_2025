import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import TabNavigation from "./TabNavigation";
import GraphView from "./GraphView";
import MaterialView from "./MaterialView";
import BattleMode from "./BattleMode";

const SubjectWorkspace: React.FC = () => {
  const { selectedSubject, activeTab, setActiveTab } = useAppContext();
  const [showGraph, setShowGraph] = useState(false);
  if (!selectedSubject) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "graph":
        return <GraphView show={showGraph} />;
      case "material":
        return (
          <MaterialView
            showGraph={showGraph}
            onGenerateGraph={() => {
              setShowGraph(true);
              setActiveTab("graph");
            }}
          />
        );
      case "battle":
        return <BattleMode />;
      default:
        return (
          <MaterialView
            showGraph={showGraph}
            onGenerateGraph={() => {
              setShowGraph(true);
              setActiveTab("graph");
            }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <TabNavigation />
      <div className="flex-grow overflow-y-auto">{renderActiveTab()}</div>
    </div>
  );
};

export default SubjectWorkspace;
