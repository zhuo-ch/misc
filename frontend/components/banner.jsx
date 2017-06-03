import React from 'react';
import { connect } from 'react-redux';
import { fetchAllBanners } from '../actions/banner_actions';
import SideBar from './side_bar';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrentBanner = this.getCurrentBanner.bind(this);
  }

  componentWillMount() {
    this.props.fetchAllBanners();
  }

  getCurrentBanner() {

  }

  render() {
    const currentBanner = this.getCurrentBanner();
debugger
    return (
      <div className='hero-banner'>
        { currentBanner }
        <SideBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentBanner: state.banner.currentBanner,
  banners: state.banner.banners,
})

const mapDispatchToProps = dispatch => ({
  fetchAllBanners: () => dispatch(fetchAllBanners()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
