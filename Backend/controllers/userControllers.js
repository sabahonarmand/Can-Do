// @desc   Register new user
//@route   Post /api/users
//@access  Public

const registerUser = asyncHandler(async (req, res) => {

    //Check if user is exists
    const userExists = await User.findOne(({ email: req.body.email }))
    if (userExists) {
        res.status(400);
        // res.status(400).send({ message: 'User already exists!' })
        throw new Error('User already exists!')
    };

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create user
    const user = await User.create({ ...req.body, password: hashedPassword })

    if (user) {
        res.status(201).json({
            token: generateToken(user._id)
        });

    } else {
        res.status(400);
        throw new Error('Invalid user data!');
    }
});

// @desc   Authenticate a user
//@route   Post /api/users/login
//@access  Public

const loginrUser = asyncHandler(async (req, res) => {

    //Check for the user email
    const user = await User.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        res.status(201).json({
            user_id: user._id,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials!')
    };
});

// @desc   Get user data
//@route   Get /api/users/me
//@access  Public

const getMe = (req, res) => {
    res.json({
        message: 'User data display'
    })
};
module.exports = { registerUser, loginrUser, getMe };
