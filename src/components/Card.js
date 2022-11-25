import React from 'react';
import { Text, View} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

// export default function Cardprofile(props){
//   ruturn(
//     <Text>
//       Hello (props.name)
//     </Text>
//   )
// }

const MyComponent = (props) => (

  <Card>

    <Card.Content>
    {/* {props.p.map((u, i) => {
            return (
              <Title>{props.name}</Title>
            );
          })} */}
      <Card.Cover style={{width: 200, height:200}} source={{ uri: 'https://picsum.photos/700' }} />

      <Title>{props.name}</Title>
      <Paragraph>{props.status}</Paragraph>
      <Paragraph>{props.species}</Paragraph>
      <Paragraph>{props.gender}</Paragraph>
    </Card.Content>

    <Card.Actions>
      <Button>Ver</Button>
    </Card.Actions>
  </Card>

);


export default MyComponent;
