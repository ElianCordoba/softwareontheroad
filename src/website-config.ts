export interface WebsiteConfig {
  title: string;
  siteTitle: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  facebook?: string;
  github?: string;
  twitter?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  books: boolean;
}

const config: WebsiteConfig = {
  title: 'Software on the road',
  siteTitle: 'Softwareontheroad: articles on node, react, angular, AWS',
  description: 'Find articles and tutorials about node, react, angular, cloud computing, aws, continuous integration, docker, and more...',
  coverImage: 'img/blog-cover.jpg',
  logo: 'img/ghost-logo.png',
  lang: 'en',
  siteUrl: 'https://softwareontheroad.com',
  github: 'https://github.com/santiq',
  twitter: 'https://twitter.com/santypk4',
  facebook: 'https://facebook.com/softwareontheroad',
  books: false,
  showSubscribe: true,
  mailchimpAction: 'https://softwareontheroad.us20.list-manage.com/subscribe/post?u=337d8675485234c707e63777d&amp;id=14f1331817',
  mailchimpName: 'b_a81b6927ac288c81b0b7f3a0f_7d717b7d75',
};

export default config;
