<?php

namespace App\Classes;

class User {
    private $nom_usuario;
    private $email;
    private $password;
    private $id_rol;

    public function __construct($nom_usuario, $email, $password) {
        $this->nom_usuario = $nom_usuario;
        $this->email = $email;
        $this->password = $password;
         $this->id_rol = $id_rol;

    }

     /**
     * Get the value of username
     */
    public function getnom_usuario()
    {
        return $this->nom_usuario;
    }

    /**
     * Set the value of username
     *
     * @return  self
     */
    public function setnom_usuario($nom_usuario)
    {
        $this->nom_usuario = $nom_usuario;

        return $this;
    }

    
     /**
     * Get the value of email
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    
     /**
     * Get the value of username
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of username
     *
     * @return  self
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }
    /**
     * Get the value of username
     */
    public function getid_rol()
    {
        return $this->id_rol;
    }

    /**
     * Set the value of username
     *
     * @return  self
     */
    public function setid_rol($id_rol)
    {
        $this->id_rol= $id_rol;

        return $this;
    }

}