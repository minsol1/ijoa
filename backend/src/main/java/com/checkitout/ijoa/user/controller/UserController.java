package com.checkitout.ijoa.user.controller;

import com.checkitout.ijoa.common.dto.ResponseDto;
import com.checkitout.ijoa.user.docs.UserApiDocumentation;
import com.checkitout.ijoa.user.dto.UserDto;
import com.checkitout.ijoa.user.dto.UserSignupRequestDto;
import com.checkitout.ijoa.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController implements UserApiDocumentation {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto> signUp(@Valid @RequestBody UserSignupRequestDto requestDto) {

        ResponseDto response = userService.signUp(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/check-email/{email}")
    public ResponseEntity<ResponseDto> checkEmailDuplication(@PathVariable String email) {

        ResponseDto response = userService.checkEmailDuplication(email);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    public ResponseEntity<UserDto> getUser() {

        UserDto response = userService.getUser();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
