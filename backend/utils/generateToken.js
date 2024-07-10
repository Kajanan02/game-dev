import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    console.log(userId)
    const JWT_SECRET = "123456"
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30,
    })
    return token;
}

export default generateToken;
