import { useParams } from 'react-router';
import TopSection from '../components/topSection';
import FooterSection from '../components/footerSection';
import ResultDisplay from '../components/resultsSection';


function ResultsPage() {
    
    const params = useParams();
    const pollId = params?.id;
    
    return (
        <div>
        <TopSection />
        <ResultDisplay pollId={pollId} />
        <FooterSection />
        </div>
        );
    }
    
    export default ResultsPage;