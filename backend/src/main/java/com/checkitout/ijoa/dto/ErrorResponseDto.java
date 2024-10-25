package com.checkitout.ijoa.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ErrorResponseDto {

    @Schema(example = "USER-001")
    private String code;

    @Schema(description = "응답 메시지", example = "이미 사용 중인 이메일입니다.")
    private String message;
}
