import Maker from '@makerdao/dai';
import spellPlugin from '@makerdao/dai-plugin-spell';

let maker;

export async function instantiateMaker() {
  const config = {
    log: true,
    autoAuthenticate: false,
    plugins: [[spellPlugin]]
  };

  maker = await Maker.create('browser', config);

  window.maker = maker; // for debugging
  return maker;
}
