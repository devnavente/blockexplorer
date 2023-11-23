import { Link } from 'react-router-dom';
import Search from './Search';

function Header({ setSearching }) {
    return (
        <header>
            <div className="max-width--1200 margin--auto padding--25">
                <Link to="/" className="logo">
                    Block explorer 🦄
                </Link>
                <Search setSearching={setSearching} />
            </div>
        </header>
    );
}

export default Header;