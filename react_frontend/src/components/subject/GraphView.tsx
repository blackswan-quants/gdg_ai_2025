import React, { useRef, useEffect, useState } from 'react';
import CardContainer from '../common/CardContainer';
import { useAppContext } from '../../context/AppContext';

interface Node {
  id: string;
  title: string;
  progress: number;
  topics?: string[];
}

interface Edge {
  from: string;
  to: string;
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

const GraphView: React.FC = () => {
  const { showGraph } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [isShown, setIsShown] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mockGraphData: GraphData = {
      nodes: [
        {
          id: 'chapter1',
          title: 'Brain divisions',
          progress: 55,
          topics: ['Cerebrum', 'Cerebellum', 'Brainstem'],
        },
        {
          id: 'chapter2',
          title: 'Spinal cord anatomy',
          progress: 20,
          topics: ['Gray Matter', 'White Matter', 'Segments'],
        },
        {
          id: 'chapter3',
          title: 'Ventricular system',
          progress: 1,
          topics: ['CSF', 'Lateral Ventricles', 'Aqueduct'],
        },
      ],
      edges: [
        { from: 'chapter1', to: 'chapter2' },
        { from: 'chapter2', to: 'chapter3' },
      ],
    };

    setGraphData(mockGraphData);
  }, []);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!graphData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const chapters = graphData.nodes;
    const nodeRadius = 40;
    const horizontalGap = canvas.width / (chapters.length + 1);

    let clickedNode: Node | null = null;
    let clickedPosition = { x: 0, y: 0 };

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const nodeX = horizontalGap * (i + 1);
      const nodeY = canvas.height / 2;

      const distance = Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2));

      if (distance <= nodeRadius) {
        clickedNode = chapter;
        clickedPosition = { x: nodeX, y: nodeY };
        break;
      }
    }

    if (clickedNode) {
      if (selectedNode?.id === clickedNode.id) {
        setSelectedNode(null);
      } else {
        setSelectedNode(clickedNode);
        setTooltipPosition(clickedPosition);
      }
    } else {
      setSelectedNode(null);
    }
  };

  useEffect(() => {
    if (!graphData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = 500;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chapters = graphData.nodes;
    const nodeRadius = 40;
    const horizontalGap = canvas.width / (chapters.length + 1);

    ctx.strokeStyle = '#4B5563';
    ctx.lineWidth = 3;

    graphData.edges.forEach(edge => {
      const fromIndex = chapters.findIndex(ch => ch.id === edge.from);
      const toIndex = chapters.findIndex(ch => ch.id === edge.to);
      if (fromIndex === -1 || toIndex === -1) return;

      const startX = horizontalGap * (fromIndex + 1);
      const startY = canvas.height / 2;
      const endX = horizontalGap * (toIndex + 1);
      const endY = canvas.height / 2;

      ctx.beginPath();
      ctx.moveTo(startX + nodeRadius, startY);
      const controlX = (startX + endX) / 2;
      const controlY = startY - 50;
      ctx.quadraticCurveTo(controlX, controlY, endX - nodeRadius, endY);
      ctx.stroke();

      const angle = Math.atan2(endY - controlY, endX - nodeRadius - controlX);
      ctx.beginPath();
      ctx.moveTo(endX - nodeRadius, endY);
      ctx.lineTo(
        endX - nodeRadius - 10 * Math.cos(angle - Math.PI / 6),
        endY - 10 * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        endX - nodeRadius - 10 * Math.cos(angle + Math.PI / 6),
        endY - 10 * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fillStyle = '#4B5563';
      ctx.fill();
    });

    chapters.forEach((chapter, index) => {
      const x = horizontalGap * (index + 1);
      const y = canvas.height / 2;

      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);

      const gradient = ctx.createLinearGradient(
        x - nodeRadius,
        y - nodeRadius,
        x + nodeRadius,
        y + nodeRadius
      );
      if (chapter.progress === 100) {
        gradient.addColorStop(0, '#10B981');
        gradient.addColorStop(1, '#059669');
      } else if (chapter.progress > 0) {
        gradient.addColorStop(0, '#8B5CF6');
        gradient.addColorStop(1, '#7C3AED');
      } else {
        gradient.addColorStop(0, '#4B5563');
        gradient.addColorStop(1, '#374151');
      }
      ctx.fillStyle = gradient;
      ctx.fill();

      if (chapter.progress > 0 && chapter.progress <= 100) {
        ctx.beginPath();
        ctx.arc(
          x,
          y,
          nodeRadius,
          -Math.PI / 2,
          (chapter.progress / 100) * Math.PI * 2 - Math.PI / 2
        );
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const words = chapter.title.split(' ');
      let line = '';
      let lines: string[] = [];
      const maxWidth = nodeRadius * 1.5;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          lines.push(line);
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      lines.forEach((line, i) => {
        ctx.fillText(line, x, y + (i - (lines.length - 1) / 2) * 15);
      });

      ctx.fillStyle = '#9CA3AF';
      ctx.font = '10px Inter, system-ui, sans-serif';
      ctx.fillText(`${chapter.progress}% Complete`, x, y + nodeRadius + 15);
    });
  }, [graphData]);

  return (
    <div className="p-6">
      {showGraph ? (
        <CardContainer className="p-6 min-h-[500px] relative">
          <h3 className="text-xl font-medium text-white mb-6">Chapter Progress Flow</h3>
          <canvas ref={canvasRef} className="w-full cursor-pointer" onClick={handleCanvasClick} />

          <div className="flex justify-center space-x-8 mt-8">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-500 mr-2"></div>
              <span className="text-sm text-gray-400">Not Started</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-400">Completed</span>
            </div>
          </div>

          {/* Topics Tooltip */}
          {selectedNode && (
            <div
              className="absolute bg-gray-800 rounded-lg p-3 shadow-lg z-50 transform -translate-y-1/2"
              style={{
                left: tooltipPosition.x + 60,
                top: tooltipPosition.y,
                minWidth: '120px',
              }}
            >
              <div className="space-y-1">
                {selectedNode.topics?.map((topic, index) => (
                  <div key={index} className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContainer>
      ) : (
        <div className="p-6">
          <h3 className="text-xl font-medium text-white mb-6">
            Generate a graph from a selected textbook !
          </h3>
        </div>
      )}
    </div>
  );
};

export default GraphView;
