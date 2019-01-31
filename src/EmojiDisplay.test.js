import React from 'react';
import EmojiDisplay from './EmojiDisplay';
import { shallow } from 'enzyme';

describe('Emoji Display Tests', () => {

    it('should render without crashing with no props', () => {
        const wrapper = shallow(<EmojiDisplay />);
        expect(wrapper.exists()).toBeTruthy();
    });
})