import React from 'react';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Stared,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends React.Components {
  static NavigationOptions = ({ navigation }) => ({
    title: navigation.getParams('user').name,
  });

  state = {
    stars: [],
  };

  async componentDidMount() {
    const { navigation } = this.props;

    const user = navigation.getParams('user');

    const response = await api.get(`user/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParams('user');
    const { stars } = this.state;
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Stared>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Stared>
          )}
        />
      </Container>
    );
  }
}
