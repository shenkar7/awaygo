import './PageHeader.css';
import logoImg from '../../assets/img/logo.jpg';

const PageHeader = () => {
    return (
        <header>
            <div className="logo">
                <a href="/"><img src={logoImg} alt="logo" width="132" height="36"/></a>
            </div>

            <div className="logout">
                <i className="fas fa-user header-icon"></i>
                <a href="/logout">התנתק</a>
            </div>
        </header>
    );
}
    
export default PageHeader;