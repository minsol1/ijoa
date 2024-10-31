package com.checkitout.ijoa.child.docs;

import com.checkitout.ijoa.child.dto.request.CreateChildRequestDto;
import com.checkitout.ijoa.child.dto.response.CreateChildResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;

@Tag(name = "ChildManagement", description = "자녀 관리 관련 API")
public interface ChildManagementApiDocumentation {

    @Operation(summary = "자녀 프로필 생성", description = "새로운 자녀를 등록합니다. 프로필 이미지가 없는 경우 체크표시를 풀어주세요.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "자녀 등록 성공", content = @Content(schema = @Schema(implementation = CreateChildResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<CreateChildResponseDto> createNewChildProfile(
            @Valid @ModelAttribute CreateChildRequestDto requestDto) throws IOException;
}
