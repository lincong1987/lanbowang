<?php
require_once("CoreEngine.php");
$engine=Singleton::getInstance();

$engine->execute();



class Singleton
{
    private static $engine;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if(!isset(self::$engine))
        {
            self::$engine = new CoreEngine();
        }

        return self::$engine;
    }
}


