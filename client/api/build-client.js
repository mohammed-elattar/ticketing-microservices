import axios from 'axios';

const buildClient = ({ req }) => {
  return axios.create({
    baseURL:
      typeof window === 'undefined'
        ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
        : '',
    headers: req?.headers,
  });
};

export default buildClient;
