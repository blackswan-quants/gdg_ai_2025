import React from "react";
import { Material } from "../../types";
import { FileText, PresentationIcon, BookOpen, BookMarked } from "lucide-react";
import CardContainer from "../common/CardContainer";
import ProgressBar from "../common/ProgressBar";

interface MaterialItemProps {
  material: Material;
}

const MaterialItem: React.FC<MaterialItemProps> = ({ material }) => {
  const getIcon = () => {
    switch (material.type) {
      case "textbook":
        return <FileText className="h-5 w-5 text-blue-400" />;
      case "slide":
        return <PresentationIcon className="h-5 w-5 text-yellow-400" />;
      case "summary":
        return <BookOpen className="h-5 w-5 text-green-400" />;
      case "flashcard":
        return <BookMarked className="h-5 w-5 text-purple-400" />;
      default:
        return <FileText className="h-5 w-5 text-blue-400" />;
    }
  };

  const getTypeLabel = () => {
    switch (material.type) {
      case "textbook":
        return "Textbooks";
      case "slide":
        return "Slides";
      case "summary":
        return "Summary";
      case "flashcard":
        return "Flashcards";
      default:
        return material.type;
    }
  };

  const getStatusColor = () => {
    if (material.progress === 100) return "#10B981"; // green
    if (material.progress > 50) return "#8B5CF6"; // purple
    if (material.progress > 0) return "#F59E0B"; // amber
    return "#6B7280"; // gray
  };

  return (
    <CardContainer className="h-full flex flex-col transition-all duration-300 hover:border-purple-500 border border-transparent">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          {getIcon()}
          <span className="ml-2 text-xs font-medium text-gray-400">
            {getTypeLabel()}
          </span>
        </div>
        <span
          className="text-xs font-medium"
          style={{ color: getStatusColor() }}
        >
          {material.progress}%
        </span>
      </div>

      <h3 className="text-white font-medium mb-1">{material.title}</h3>
      <p className="text-gray-400 text-xs mb-4">
        Created on {new Date(material.dateCreated).toLocaleDateString()}
      </p>

      <div className="mt-auto">
        <ProgressBar
          progress={material.progress}
          color={getStatusColor()}
          height={4}
        />
      </div>
    </CardContainer>
  );
};

export default MaterialItem;
