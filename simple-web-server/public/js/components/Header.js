import fetchView from '@utils/fetchView.js';

const Header = async () => {
  const dom = await fetchView('Header');

  dom.querySelector('.menu-button').onclick = () => {
    const sidebar = document.querySelector('.Sidebar');
    const contentBox = document.querySelector('.ContentBox');
    sidebar.classList.toggle('Sidebar-close');
    contentBox.classList.toggle('Sidebar-close');
  }

  dom.querySelector('.user-profile img').onclick = () => {
    alert('Profile clicked!');
  }

  return dom;
}

export default Header;