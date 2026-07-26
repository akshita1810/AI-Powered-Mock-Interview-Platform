import { RiQuestionAnswerLine } from 'react-icons/ri';
import Card from './Card';

const QuestionCard = ({ question, number, label = 'Current Question' }) => (
  <Card solid hover={false} style={{ padding: '28px 32px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <div style={{
        width: 36, height: 36,
        background: 'rgba(124, 111, 247, 0.2)',
        border: '1px solid rgba(124, 111, 247, 0.3)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <RiQuestionAnswerLine size={20} color="var(--color-primary-light)" />
      </div>
      <span className="badge badge-primary">
        {number ? `Question ${number}` : label}
      </span>
    </div>
    <h4 style={{ fontSize: '18px', lineHeight: 1.5, fontWeight: 600 }}>
      {question}
    </h4>
  </Card>
);

export default QuestionCard;
