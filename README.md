# Yodlr Authentication Exercise
---

### Proposal

A web application that allows users to make accounts, login, logout, and allows admins to change the status and admin priveliges of other users once logged in.

Major Goal: show off some super-sweet efficient and clean code!

This application will use:
 * backend:
  * Node.js
  * Express
  * json file with data object containing user profiles (this file will emulate a database)
 * frontend:
  * react
  * redux

---

### Noteable Accomplishments

Streamlined registration and authentication code that is super clean and easy to read. Below are some excerpts from a few files.
<details>
    <summary>code highlights/excerpts</summary>
        Singin.js (signin component, form submission)

        ```
            async function handleSubmit(evt) {
                evt.preventDefault();
                try {
                    let res = await dispatch(LogIn(formData));
                    if (res === 'login failure') throw new Error(res);
                    if (res === 'login success') history.push('/home');
                } catch (err) {
                    alert(err);
                    console.log(err.stack);
                }
            }
        ```

        profileActionCreators.js (front-end signin handler functionality)

        ```
            // ----- [///// ACTION CREATORS /////] -----
            export function LogIn({ email, password }) {
                return async function (dispatch) {
                    try {
                        let { token, id } = await YodlrApi.login(email, password);
                        if (!token) throw new Error();
                        YodlrApi.token = token;
                        await dispatch(setProfileLoggedIn());
                        await dispatch(UpdateProfileData(id));
                        return ('login success');
                    } catch (err) {
                        console.log(err.stack);
                        await dispatch(gotError());
                        return ('login failure');
                    }
                }
            }

            export function UpdateProfileData(id) {
                return async function (dispatch) {
                    try {
                        let user = await YodlrApi.getUser(id);
                        let usersList = [];
                        if (user.isAdmin === true) {
                            usersList = await YodlrApi.getAllUsers();
                        }
                        await dispatch(setProfileData(user, usersList));
                    } catch (err) {
                        console.log(err.stack);
                        await dispatch(gotError());
                    }
                }
            }

            // ----- [///// DISPATCH HANDLERS /////] -----
            export function setProfileLoggedIn() {
                return {
                    type: 'LOGIN'
                }
            }

            export function setProfileData(user, usersList) {
                let { id, firstName, lastName, email, isAdmin, state } = user;

                return {
                    type: 'SET_PROFILE_DATA',
                    id: id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    isAdmin: isAdmin,
                    state: state,
                    usersList: usersList
                }
            }

            export function gotError() {
                return {
                    type: 'ERROR'
                }
            }
        ```

        yodlr_api.js (API helper for backedn interaction)

        ```
            // ----- [///// CLASS /////] -----
            class YodlrApi {
                static token;
                static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

                static async login(email, password) {
                    try {
                        let res = await axios.post(`${YodlrApi.BASE_URL}/auth/login`, { email, password });
                        return res.data;
                    } catch (err) {
                        console.log(err);
                        return err;
                    }
                }

                static async getUser(id) {
                    let user = await this.request(`users/${id}`);
                    return user;
                }
            }
        ```

        auth.js (backend express authentication routes for login proccess)

        ```
            // ----- [///// ROUTES /////] -----
            /* User login */
            router.post('/login', async function (req, res, next) {
                try {
                    // validation
                    const validator = jsonschema.validate(req.body, userLoginSchema);
                    if (!validator.valid) {
                        const errs = validator.errors.map(e => e.stack);
                        throw new BadRequestError(errs);
                    }

                    // login with validated data
                    let { email, password } = req.body;
                    let user = await User.authenticate(email, password);
                    let id = user.id;
                    let token = createToken(user);
                    return res.json({ token, id })
                } catch (err) {
                    return next(err);
                }
            });
        ```

        users.js (backend route for fetching user data after authentication)

        ```
            // ----- [///// ROUTES /////] -----
            /* Get a specific user by id */
            router.get('/:id', async function (req, res, next) {
                try {
                    const user = await User.get(req.params.id);
                    return res.json(user);
                } catch (err) {
                    return next(err);
                }
            });
        ```

        user.js (backend model for authentication and fetching data from our fake json database)

        ```
            // ----- [///// CLASS /////] -----
            class User {
                /* Verify user login */
                static async authenticate(email, password) {
                    let user
                    for (let key in users) {
                        if (users[key].email === email) {
                            user = users[key];
                            break
                        }
                    }

                    if (!user) throw new NotFoundError();

                    const isValid = await bcrypt.compare(password, user.password);
                    if (isValid === true) {
                        return user;
                    }

                    throw new UnauthorizedError("Invalid email/password");
                }

                /* Get a specific user by id */
                static async get(id) {
                    let user = users[id];
                    if (!user) throw new NotFoundError();
                    return users[id];
                }
        ```

        tokens.js (backend tokenization using JWT)

        ```
            // ----- [///// MAIN /////] -----
            /** Create and sign a JWT token */
            function createToken(user) {
                console.assert(user.isAdmin !== undefined,
                    "createToken passed user without isAdmin property");
                let payload = {
                    email: user.email,
                    isAdmin: user.isAdmin || false,
                };
                return jwt.sign(payload, SECRET_KEY);
            }
        ```

        ProtectedRoute.js (react-redux route protection component for increased security)

        ```
            const ProtectedRoute = (props) => {
                const profile = useSelector(store => store.profile);

                return (profile.isLoggedIn ? props.children : <Redirect to={{ pathname: '/' }} />)
            }
        ```

        Routes.js (ProtectedRoute in action)

        ```
            function Routes() {
                return (
                    <Switch>
                        <Route path='/signup'><Signup /></Route>
                        <Route path='/signin'><Signin /></Route>
                        <ProtectedRoute path='/home'><Home /></ProtectedRoute>
                        <Route path='/'><Welcome /></Route>
                    </Switch>
                )
            }
        ```

</details>

Awesome efficient back end and front end error handling!
<details>
    <summary>backend error handling code highlights/excerpts</summary>
        expressError.js (streamlined error class extension)

        ```
            /** ExpressError extends normal JS error so we can
            *  add a status when we make an instance of it.
            *
            *  The error-handling middleware will return this.
            */

            class ExpressError extends Error {
                constructor(message, status) {
                    super();
                    this.message = message;
                    this.status = status;
                }
            }

            /** 404 NOT FOUND error. */
            class NotFoundError extends ExpressError {
                constructor(message = "Not Found") {
                    super(message, 404);
                }
            }

            /** 401 UNAUTHORIZED error. */
            class UnauthorizedError extends ExpressError {
                constructor(message = "Unauthorized") {
                    super(message, 401);
                }
            }

            /** 400 BAD REQUEST error. */
            class BadRequestError extends ExpressError {
                constructor(message = "Bad Request") {
                    super(message, 400);
                }
            }

            /** 403 BAD REQUEST error. */
            class ForbiddenError extends ExpressError {
                constructor(message = "Bad Request") {
                    super(message, 403);
                }
            }
        ```

</details>

<details>
    <summary>frontend error handling code highlights/excerpts</summary>
        try-catch and log error stack from any attempts to interact with backend:

        ```
            async function logout() {
                try {
                    let res = await dispatch(LogOut());
                    if (res === 'logout failure') throw new Error(res);
                    if (res === 'logout success') history.push('/home');
                } catch (err) {
                    alert(err);
                    console.log(err.stack);
                }
            }
        ```

</details>