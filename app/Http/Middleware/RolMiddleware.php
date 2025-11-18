<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RolMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,...$roles): Response
    {
        $Usuario = Auth::user();
        if(!$Usuario||!in_array($Usuario->id_rol,$roles)){
            $response = redirect('/Login');

        }
        else{
            $response= $next($request);
        }
        return $response;
    }
}
