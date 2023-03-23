import RingCentral from '@rc-ex/core';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

const main = async () => {
  // jwt flow
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });

  // list all chats
  const r = await rc.teamMessaging().chats().list({ recordCount: 20 });
  for (const chat of r.records ?? []) {
    console.log('Processing', chat.name, '-', chat.description);
    const r2 = await rc.teamMessaging().chats(chat.id).posts().list({ recordCount: 20 });
    console.log('Latest 20 message in the chat:', r2);
    console.log('Finished processing', chat.name, '-', chat.description);
  }

  // const r = await rc.get('/restapi/v1.0/glip/chats');
  // console.log(r.data);

  // // OR password flow
  // await rc.authorize({
  //   username: '',
  //   extension: '',
  //   password: '',
  // });

  // // list all teams
  // const r = await rc.teamMessaging().teams().list({ recordCount: 20 });
  // for (const team of r.records ?? []) {
  //   console.log(team.name, '-', team.description);
  // }

  // create a team
  // const r = await rc
  //   .teamMessaging()
  //   .teams()
  //   .post({
  //     public: true,
  //     name: 'Fun team',
  //     members: [{ email: 'member.1@gmail.com' }, { email: 'member.2@gmail.com' }],
  //     description: "Let's chit chat here",
  //   });
  // console.log(r);
};
main();
