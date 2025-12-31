import fetchView from '@utils/fetchView.js';

const Header = async () => {
  const header = await fetchView('Header');

  header.querySelector('.menu-button').onclick = () => {
    const sidebar = document.querySelector('.Sidebar');
    const contentBox = document.querySelector('.ContentBox');
    sidebar.classList.toggle('Sidebar-close');
    contentBox.classList.toggle('Sidebar-close');
  }

  header.querySelector('.user-profile img').onclick = () => {
    alert('Profile clicked!');
  }

  return header;
}

export default Header;