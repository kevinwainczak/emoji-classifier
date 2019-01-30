import React from 'react';
import App from './App';

import { mount, shallow } from 'enzyme';


describe('App Tests', () => {

  const component = <App />;
  const wrapper = mount(component);

  const shallowWrapper = shallow(component);

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should increment drawNum and trainingData length', () => {
    const pixels = [0,0,0,0,1,1,1,1,0,0,0,0];
    shallowWrapper.setState({ drawNum: 0, trainData: [] });
    shallowWrapper.instance().trainData(pixels);
    expect(wrapper.instance().state('drawNum')).toEqual(1);
    expect(wrapper.instance().state('trainingData').length).toEqual(1);
  });

});
