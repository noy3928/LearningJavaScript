const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { ForbiddenError, AuthenticationError } = require("apollo-server-express")
require("dotenv").config()
const mongoose = require("mongoose")

const gravatar = require("../util/gravatar")

module.exports = {
  newNote: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to create a note")
    }

    return await models.Note.create({
      content: args.content,
      author: mongoose.Types.ObjectId(user.id),
    })
  },
  deleteNote: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to delete a note")
    }

    const note = await models.Note.findById(id)
    //note 소유자와 현재 사용자가 불일치하면 접근 에러 던지기
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the note")
    }

    try {
      await note.remove()
      return true
    } catch (err) {
      return false
    }
  },
  updateNote: async (parent, { content, id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to update a note")
    }

    const note = await models.Note.findById(id)
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the note")
    }
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    )
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    //이메일 주소 스트링 처리
    email = email.trim().toLowerCase()
    //비밀번호 해싱
    const hashed = await bcrypt.hash(password, 10)
    //gravatar URL 생성
    const avatar = gravatar(email)
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      })
      //JWT 생성 및 반환
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    } catch (err) {
      console.log(err)
      //계정 생성 중 문제가 발생하면 에러 던지기
      throw new Error("Error creating account")
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase()
    }

    const user = await models.User.findOne({ $or: [{ email }, { username }] })

    //사용자를 찾지 못하면 인증 에러 던지기
    if (!user) {
      throw new AuthenticationError("Error signing in")
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new AuthenticationError("Error signing in")
    }

    //JWT 생성 및 반환
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  },
}
