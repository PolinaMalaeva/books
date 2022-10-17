/** @type {import('next').NextConfig} */
require('dotenv').config();

module.exports = {
    images: {
        domains: ['www.gutenberg.org'],
    },
    env: {
        VERSION: process.env.VERSION
    }
};