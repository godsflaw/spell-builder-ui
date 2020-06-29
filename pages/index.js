/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx, Card, Heading, Box, Label, Input, Button } from 'theme-ui';
import useMaker from '../hooks/useMaker';

const Index = () => {
  const { maker } = useMaker();
  const defaultUrl = 'https://changelog.makerdao.com/releases/mainnet/1.0.8/contracts.json';
  const defaultSpellDescription = 'Executive Spell';
  const defaultCopyrightOrganization = 'MakerDao';
  const defaultSolidityVersion = '0.5.12';
  const defaultDsr = '1000000000000000000000000000';
  const [addressUrl, setAddressUrl] = useState(defaultUrl);
  const [spellDescription, setSpellDescription] = useState(defaultSpellDescription);
  const [copyrightOrganization, setCopyrightOrganization] = useState(defaultCopyrightOrganization);
  const [solidityVersion, setSolidityVersion] = useState(defaultSolidityVersion);
  const [dsr, setDsr] = useState(defaultDsr);
  const [spell, setSpell] = useState(null);

  async function buildSpell(){
    const response = await fetch(addressUrl);
    const json = await response.json();
    if (!response.ok) throw new Error(`${response.statusText}: ${json.error?.message || JSON.stringify(json)}`);
    let config = {};
    config.general = json;
    config.copyright = {ORGANIZATION: copyrightOrganization};
    config.spell_action_contract = {SPELL_DESCRIPTION: spellDescription};
    config.pragma = {SOLIDITY_VERSION: solidityVersion};
    if (dsr) config.spell_action_dsr_rate = {DSR_RATE: dsr};
    console.log('config', config);
    await maker.authenticate();
    const s = maker.service('spellBuilder').buildSpell(config);
    console.log({s});
    setSpell(s);
  }


  return (
    <Container>
      <Box sx={{ mt: 2, ml: [0, 'auto'], mr: [null, 0] }}>
        <Heading>Spell Builder</Heading>
        <Card sx={{ py: 0, px: 3, my: 2 }}>
          <Label>Spell Description</Label>
          <Input onChange={(event) => setSpellDescription(event.target.value)}
          value={spellDescription}
          defaultValue={defaultSpellDescription}></Input>
          <Label>Contract Addresses link</Label>
          <Input onChange={(event) => setAddressUrl(event.target.value)}
          value={addressUrl}
          defaultValue={defaultUrl}></Input>
          <Label>Copyright Organization</Label>
          <Input onChange={(event) => setCopyrightOrganization(event.target.value)}
          value={copyrightOrganization}
          defaultValue={defaultCopyrightOrganization}></Input>
          <Label>Solidity Version</Label>
          <Input onChange={(event) => setSolidityVersion(event.target.value)}
          value={solidityVersion}
          defaultValue={defaultSolidityVersion}></Input>
          <Label>Adjust DSR</Label>
          <Input onChange={(event) => setDsr(event.target.value)}
          value={dsr}
          defaultValue={defaultDsr}></Input>

          <Button onClick={buildSpell}>
          Build Spell
          </Button>
        </Card>
        {spell ? 
          <div>
            <Heading>Spell</Heading>
            <Card sx={{ py: 0, px: 3, my: 2}}>
              <p style={{whiteSpace: 'pre'}}> {spell} </p>
            </Card>
          </div> : ''
        }
      </Box>
    </Container>
  );
};

export default Index;
