import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import CalculatorTool from '@/components/CalculatorTool.vue';


describe('CalculatorTool.vue', () => {

  const wrapper = shallowMount(CalculatorTool);

  describe('emits', () => {
    
    wrapper.vm.$emit('update-message', 'new message');
    wrapper.vm.$emit('update-message', 'AAAAAAAAAAA!!!!!!!!');

    it('emit update-message', () => {
      expect(wrapper.emitted()['update-message'].length).to.equal(2);
      expect(wrapper.emitted()['update-message'][0]).to.deep.equal(['new message']);
      expect(wrapper.emitted()['update-message'][1]).to.deep.equal(['AAAAAAAAAAA!!!!!!!!']);
    });

  });

});
