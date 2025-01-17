package com.checkitout.ijoa.user.docs;

import com.checkitout.ijoa.common.dto.ResponseDto;
import com.checkitout.ijoa.user.dto.request.UserSignupRequestDto;
import com.checkitout.ijoa.user.dto.request.UserUpdateRequestDto;
import com.checkitout.ijoa.user.dto.response.TutorialDto;
import com.checkitout.ijoa.user.dto.response.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "User", description = "사용자 관련 API")
public interface UserApiDocumentation {

    @Operation(summary = "회원가입", description = "새로운 사용자를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원 가입 성공", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ResponseDto> signUp(@Valid @RequestBody UserSignupRequestDto requestDto);


    @Operation(summary = "이메일 중복 확인", description = "회원가입시 이메일 중복 검사")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "중복된 이메일이 없습니다 ", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ResponseDto> checkEmailDuplication(
            @Parameter(description = "중복 확인할 이메일 주소", example = "email@email.com") @PathVariable String email);


    @Operation(summary = "회원 정보 조회", description = "사용자의 상세 정보 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 정보 조회 성공 ", content = @Content(schema = @Schema(implementation = UserDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<UserDto> getUser();


    @Operation(summary = "회원 정보 수정", description = "사용자 정보 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 정보 수정 성공 ", content = @Content(schema = @Schema(implementation = UserDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<UserDto> updateUser(@RequestBody UserUpdateRequestDto requestDto);

    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 정보 삭제 성공 ", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ResponseDto> signOut();

    @Operation(summary = "비밀번호 초기화", description = "비밀번호 초기화를 요청합니다. 새로운 비밀번호가 이메일로 전송됩니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 초기화 성공 ", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ResponseDto> resetUserPassword(@PathVariable String email);

    @Operation(summary = "튜토리얼 진행 완료 처리", description = "튜토리얼 진행여부를 true로 바꿉니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "튜토리얼 완료 성공 "),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ResponseDto> tutorial();

    @Operation(summary = "튜토리얼 진행 여부 조회 ", description = "튜토리얼 진행여부를 알 수 있습니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "튜토리얼 진행 여부 조회 성공 "),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<TutorialDto> getTutorial();

}
