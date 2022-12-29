import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ErrorMessage from '@/components/ErrorMessage.vue';


describe('ErrorMessage.vue', () => {

  it('renders props.msg when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(ErrorMessage, {
      props: { message }
    });
    expect(wrapper.text()).to.equal(message);
  });

});
