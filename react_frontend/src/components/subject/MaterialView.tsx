import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CardContainer from '../common/CardContainer';
import MaterialItem from './MaterialItem';
import { PlusCircle, Share2 } from 'lucide-react';
import GraphView from './GraphView';
import MaterialViewer from './MaterialViewer';

const MaterialView: React.FC = () => {
  const { selectedSubject, setSelectedMaterial, selectedMaterial, setShowGraph, setActiveTab } =
    useAppContext();
  const [isGeneratingGraph, setIsGeneratingGraph] = useState(false);

  if (!selectedSubject) return null;

  const allMaterials = selectedSubject.chapters.flatMap(chapter =>
    chapter.materials.map(material => ({
      ...material,
      chapterTitle: chapter.title,
    }))
  );

  const handleGenerateGraph = async () => {
    setIsGeneratingGraph(true);
    await new Promise(resolve => setTimeout(resolve, 5000));
    setIsGeneratingGraph(false);
    setShowGraph(true);
    setActiveTab('graph');
  };

  return (
    <div className="p-6">
      {isGeneratingGraph && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CardContainer className="p-6 max-w-md w-full">
            <h3 className="text-xl font-medium text-white mb-4">Generating Graph</h3>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{
                  width: '100%',
                  animation: 'progress 5s linear',
                }}
              />
            </div>
            <style>{`
              @keyframes progress {
                from { width: 0%; }
                to { width: 100%; }
              }
            `}</style>
          </CardContainer>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium text-white">Study Materials</h3>
        <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-2 rounded-lg text-sm">
          <PlusCircle size={16} />
          <span>Add Material</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allMaterials.map(material => (
          <div
            key={material.id}
            className="relative group"
            onClick={() => {
              setSelectedMaterial(material);
            }}
          >
            <MaterialItem material={material} />
            {material.type === 'textbook' && (
              <button
                onClick={handleGenerateGraph}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded-lg text-xs flex items-center"
              >
                <Share2 size={14} className="mr-1" />
                Generate Graph
              </button>
            )}
          </div>
        ))}
      </div>

      {allMaterials.length === 0 && (
        <CardContainer className="py-12 flex flex-col items-center justify-center">
          <p className="text-gray-400 mb-4">No materials found</p>
        </CardContainer>
      )}
      {selectedMaterial && <MaterialViewer />}
    </div>
  );
};

export default MaterialView;
