'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const Auth0Strategy = require('passport-auth0')
const uid = require('uid-safe')
const config = require('config')['passport'];

// 3 - configuring Auth0Strategy
const auth0Strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN || 'dhyeon.auth0.com',
    clientID: process.env.AUTH0_CLIENT_ID ||'WP2dB9lmuEOt1nH8uMIo0aJu6n4Hbb51',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || 'lIE7iZMjnDYIEmq90fHg46nsUeCrqKSDBJBIMMiJduzCGB-YEv9NRofbrssIPs8f',
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);
console.log(auth0Strategy)
// 4 - configuring Passport
passport.use(auth0Strategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//
// passport.use('google', new GoogleStrategy({
//   clientID: config.Google.clientID,
//   clientSecret: config.Google.clientSecret,
//   callbackURL: config.Google.callbackURL
// }, (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('google', profile, done))
// );
//
// passport.use('facebook', new FacebookStrategy({
//   clientID: config.Facebook.clientID,
//   clientSecret: config.Facebook.clientSecret,
//   callbackURL: config.Facebook.callbackURL,
//   profileFields: ['id', 'emails', 'name', 'photos']
// }, (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('facebook', profile, done))
// );
//
//
// const getOrCreateOAuthProfile = (type, oauthProfile, done) => {
//   return models.Auth.where({ type, oauth_id: oauthProfile.id }).fetch({
//     withRelated: ['profile']
//   })
//     .then(oauthAccount => {
//
//       if (oauthAccount) {
//         throw oauthAccount;
//       }
//
//       if (!oauthProfile.emails || !oauthProfile.emails.length) {
//         // FB users can register with a phone number, which is not exposed by Passport
//         throw null;
//       }
//       return models.Profile.where({ email: oauthProfile.emails[0].value }).fetch();
//     })
//     .then(profile => {
//       let profileInfo = {
//         first: oauthProfile.name.givenName,
//         last: oauthProfile.name.familyName,
//         display: oauthProfile.displayName || `${oauthProfile.name.givenName} ${oauthProfile.name.familyName}`,
//         email: oauthProfile.emails[0].value,
//         avatar: oauthProfile.photos[0].value
//       };
//
//       if (profile) {
//         //update profile with info from oauth (original code)
//         // return profile.save(profileInfo, { method: 'update' });
//         //update to below because of new columns
//         return profile.save({first: profileInfo.first, last: profileInfo.last, display: profileInfo.display,
//           email: profileInfo.email, avatar: profileInfo.avatar}, {patch: true});
//       }
//       // otherwise create new profile
//       return models.Profile.forge(profileInfo).save();
//     })
//     .tap(profile => {
//
//       return models.Auth.forge({
//         type,
//         profile_id: profile.get('id'),
//         oauth_id: oauthProfile.id
//       }).save();
//     })
//     .error(err => {
//
//       done(err, null);
//     })
//     .catch(oauthAccount => {
//
//       if (!oauthAccount) {
//         throw oauthAccount;
//       }
//       return oauthAccount.related('profile');
//     })
//     .then(profile => {
//
//       if (profile) {
//         done(null, profile.serialize());
//       }
//     })
//     .catch(() => {
//
//       // TODO: This is not working because redirect to login uses req.flash('loginMessage')
//       // and there is no access to req here
//       done(null, null, {
//         'message': 'Signing up requires an email address, \
//           please be sure there is an email address associated with your Facebook account \
//           and grant access when you register.' });
//     });
// };

module.exports = passport;
