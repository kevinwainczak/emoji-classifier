import React from 'react';
import App from './App';

import { mount, shallow } from 'enzyme';
import sinon from 'sinon';


describe('App Tests', () => {

  const component = <App />;
  const wrapper = mount(component);

  const shallowWrapper = shallow(component);

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Train Data tests", () => {
    it('should increment drawNum and trainingData length', () => {
      const pixels = [0,0,0,0,1,1,1,1,0,0,0,0];
      shallowWrapper.setState({ currentEmoji: '💰'});
      shallowWrapper.instance().trainData(pixels);
      expect(shallowWrapper.state('drawNum')).toEqual(1);
    });
  
    it('should increment trainingData length', () => {
      expect(shallowWrapper.state('trainingData').length).toEqual(1);
    })
  
    it('should change the emoji', () => {
      const pixels = [0,0,0,0,1,1,1,1,0,0,0,0];
      const emoji = shallowWrapper.state('currentEmoji');
      shallowWrapper.instance().trainData(pixels);
      shallowWrapper.instance().trainData(pixels);
      expect(shallowWrapper.state('currentEmoji')).not.toEqual(emoji);
    });
  
    it('should reset draw num to zero', () => {
      expect(shallowWrapper.state('drawNum')).toEqual(0);
    });
  
    it('should increase the length of the training data by 1', () => {
      expect(shallowWrapper.state('trainingData').length).toEqual(3);
    });
  });

  describe('Run Model Tests', () => {

    it('should return highest scoring emoji', () => {
      const fake = sinon.stub().returns({ 'A': 0.1, 'B': 0.5, 'C': 0.4});
      const pixels = [0,0,0,0,1,1,1,1,0,0,0,0];
      shallowWrapper.instance().net = { run: fake}
      shallowWrapper.instance().runModel(pixels);
      expect(fake.called).toBeTruthy();
      expect(shallowWrapper.state('modelGuessedEmoji')).toEqual('B');
    });
    
  });

  describe('Toggle Run Train Tests', () => {
    it('should change the state of train from true to false', () => {
      shallowWrapper.setState({ train: true});
      const fake = sinon.stub().resolves({ 'error': 0.01, 'iterations': 20});
      shallowWrapper.instance().net = { trainAsync: fake };
      shallowWrapper.instance().toggleRunTrain();
      expect(shallowWrapper.state('train')).toBeFalsy();
    });

    it('should change the state of train from false to true', () => {
      shallowWrapper.instance().toggleRunTrain();
      expect(shallowWrapper.state('train')).toBeTruthy();
    });

  });

  describe('Reset tests', () => {
    it('should set modelGuessedEmoji to null', () => {
      shallowWrapper.setState({ modelGuessedEmoji: 'A' });
      shallowWrapper.instance().reset();
      expect(shallowWrapper.state('modelGuessedEmoji')).toBeNull();
    });
  });
  

});
