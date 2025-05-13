import React from 'react';
import { BoxIcon } from 'lucide-react';
interface FeatureCardProps {
  title: string;
  description: string;
  icon: BoxIcon;
  iconColor?: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = 'from-indigo-500 to-purple-500'
}) => {
  return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`bg-gradient-to-r ${iconColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
};
export default FeatureCard;