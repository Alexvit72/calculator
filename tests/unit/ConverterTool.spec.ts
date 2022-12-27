import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ConverterTool from '@/components/ConverterTool.vue';
import { bases } from '@/utils';


describe('ConverterTool.vue', () => {

  const items = Object.keys(bases);
  const wrapper = shallowMount(ConverterTool);

  describe('renders & emits', () => {

    wrapper.vm.$emit('update-message', 'new message from converter')
    wrapper.vm.$emit('update-message', 'OOOOOOOOOOO!!!!!!!!')

    describe('renders bases menu & click menu buttons', () => {

      const buttons = wrapper.findAll('#converter_menu button');

      for (let i = 0; i < items.length; i++) {
        it(`renders base ${items[i]}`, () => {
          expect(buttons[i].text()).to.equal(`${items[i]}`);
        });
      }

      const index = Math.floor(Math.random() * buttons.length);
      buttons[index].trigger('click');
      it(`click button ${items[index]}`, () => {
        expect(buttons[index].classes('border-opacity-100')).to.be.true;
      });

    });

    it('emit update-message', () => {
      expect(wrapper.emitted()['update-message'].length).to.equal(2);
      expect(wrapper.emitted()['update-message'][0]).to.deep.equal(['new message from converter']);
      expect(wrapper.emitted()['update-message'][1]).to.deep.equal(['OOOOOOOOOOO!!!!!!!!']);
    });

  });

});
