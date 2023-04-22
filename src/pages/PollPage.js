import TopSection from '../components/topSection';
import FooterSection from '../components/footerSection';
import PollingOptions from '../components/pollingOptions';

import { useParams } from 'react-router';

function PollPage() {

  const params = useParams();
  const pollId = params?.id;

  return (
    <div>
      <TopSection />
      <PollingOptions pollId={pollId} />
      <FooterSection />
    </div>
  );
}

export default PollPage;