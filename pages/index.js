/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx, Card, Heading, Box, Label, Input, Button } from 'theme-ui';

async function fetchJson(url, init) {
  const response = await fetch(url, init);
  const json = await response.json();

  if (!response.ok) throw new Error(`${response.statusText}: ${json.error?.message || JSON.stringify(json)}`);
  return json;
}

const Index = () => {
  const defaultUrl = 'https://changelog.makerdao.com/releases/mainnet/1.0.8/contracts.json';
  const [addressUrl, setAddressUrl] = useState(defaultUrl);

  async function buildSpell(){
    console.log('addressUrl', addressUrl);
    const response = await fetch(addressUrl);
    const json = await response.json();
    if (!response.ok) throw new Error(`${response.statusText}: ${json.error?.message || JSON.stringify(json)}`);
    console.log('json', json);
  }


  return (
    <Container>
      <Box sx={{ mt: 2, ml: [0, 'auto'], mr: [null, 0] }}>
        <Heading>Spell Builder</Heading>
        <Card sx={{ py: 0, px: 3, my: 2 }}>
          <Label>Contract Addresses link</Label>
          <Input onChange={(event) => setAddressUrl(event.target.value)}
          value={addressUrl}
          defaultValue={defaultUrl}></Input>
          <Label>Copyright Organization</Label>
          <Input defaultValue="MakerDao"></Input>
          <Label>Solidity Version</Label>
          <Input defaultValue="0.5.12"></Input>
          <Button onClick={buildSpell}>
          Build Spell
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default Index;
