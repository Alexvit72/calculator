import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ControlPad from '@/components/ControlPad.vue';
import { buttons } from '@/utils';


describe('ControlPad.vue', () => {

  const tool = Object.keys(buttons)[0];
  const wrapper = shallowMount(ControlPad, {
    props: { tool }
  });

  describe('renders props.tool when passed and emits', () => {

    const renderedButtons = wrapper.findAll('button');

    it(`renders ${tool} button`, () => {
      expect(renderedButtons.length).to.equal(buttons[tool].length);
    });

    for (let i = 0; i < buttons[tool].length; i++) {
      renderedButtons[i].trigger('click');
      it(`click button ${buttons[tool][i].value}`, () => {
        expect(wrapper.emitted()['click'][i]).to.deep.equal([`${buttons[tool][i].value}`]);
      });
    }

  });
  
});
