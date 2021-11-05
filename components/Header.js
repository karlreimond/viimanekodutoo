import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { UserOutlined, TableOutlined, HomeOutlined, DownCircleOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";


class Header extends React.Component {
  state = {
    current: 'user',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="user" icon={<UserOutlined />}><Link to="/UserLogin"></Link>
          Login
        </Menu.Item>
        <Menu.Item key="register" icon={<UserOutlined />}><Link to="/UserRegister"></Link>
          Register
        </Menu.Item>
        <Menu.Item key="table" icon={<TableOutlined />}><Link to="/Table"></Link>
          Table
        </Menu.Item>
        <Menu.Item key="posts" icon={<DownCircleOutlined />}><Link to="/Posts"></Link>
          Posts
        </Menu.Item>
        <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/"></Link>
          Home
        </Menu.Item>
      </Menu>
    );
  }
}
document.getElementById('root');


export default Header;