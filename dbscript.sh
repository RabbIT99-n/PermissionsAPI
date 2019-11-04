#!/bin/sh
psql -U postgres << END_OF_SCRIPT

DROP DATABASE testdb; -- drop the DB if exists 

CREATE DATABASE testdb WITH OWNER = postgres;

\c testdb

-- Create tables of the DB

CREATE TABLE objects (id serial PRIMARY KEY, objname varchar (100) UNIQUE NOT NULL);
CREATE TABLE users (id serial PRIMARY KEY, username varchar (100) UNIQUE NOT NULL);
CREATE TABLE groups (id serial PRIMARY KEY, groupname varchar(100) NOT NULL, username varchar (100));
CREATE TABLE permissions (id serial PRIMARY KEY, ownertype varchar(100) NOT NULL, owner varchar(100) NOT NULL, objname varchar (100) NOT NULL, type varchar(100) NOT NULL);

END_OF_SCRIPT