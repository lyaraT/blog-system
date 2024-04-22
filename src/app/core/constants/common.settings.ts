export class SETTINGS {
  public static ACCESS_TOKEN = '%&^%^*@&*#';
  public static LOGGED_IN_USER = '#$%@^^%';

  //public static BASE_API = 'http://localhost:3000';

  public static BASE_API = 'https://blogsystembackend.web.app';
  // public static BASE_API = 'https://group-4-api.laravelsrilanka.com';
  // public static BASE_API = environment.baseUrl; // do not change this

  public static KEYS = {
    SECRET: 'iIUsWtNZcf',
  };


  public static REGEX = {
    PASSWORD: {
      EXP: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
    },
    PHONE: {
      EXP: '^[0-9]{1,10}$',
    },
    ID: {
      EXP: '^[0-9]{9}v$',
    },
    LETTERS: {
      EXP: '[a-zA-Z\\s]*$',
    },
  };

}
