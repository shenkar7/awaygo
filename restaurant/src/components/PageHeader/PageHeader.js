import './PageHeader.css';
import logoImg from '../../assets/img/logo.jpg';
import MenuButton from './MenuButton/MenuButton';

const PageHeader = () => {
    return (
        <header>
            <div>
                <i className="fas fa-user header-icon"></i>
                <i className="fas fa-clock header-icon"></i>
                <i className="fas fa-bell header-icon"></i>
            </div>
            <div>
                <a href="/"><img src={logoImg} alt="logo" width="132" height="36"/></a>
            </div>
            <div>
                <MenuButton/>
            </div>
        </header>
    );
}
    
export default PageHeader;