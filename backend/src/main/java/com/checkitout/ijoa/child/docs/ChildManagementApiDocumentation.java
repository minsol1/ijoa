package com.checkitout.ijoa.child.docs;

import com.checkitout.ijoa.child.dto.request.CreateChildRequestDto;
import com.checkitout.ijoa.child.dto.request.UpdateChildRequestDto;
import com.checkitout.ijoa.child.dto.response.ChildDto;
import com.checkitout.ijoa.common.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "ChildManagement", description = "자녀 관리 관련 API")
public interface ChildManagementApiDocumentation {

    @Operation(summary = "자녀 프로필 생성", description = "새로운 자녀를 등록합니다. 프로필 이미지가 없는 경우 체크표시를 풀어주세요.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "자녀 등록 성공", content = @Content(schema = @Schema(implementation = ChildDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ChildDto> createNewChildProfile(
            @Valid @ModelAttribute CreateChildRequestDto requestDto) throws IOException;


    @Operation(summary = "자녀 프로필 수정", description = "자녀 프로필을 수정합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "자녀 프로필 수정 성공", content = @Content(schema = @Schema(implementation = ChildDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ChildDto> updateChildProfile(
            @Parameter(description = "수정할 자녀의 ID", example = "1") @PathVariable Long childId,
            @ModelAttribute UpdateChildRequestDto requestDto)
            throws IOException;

    @Operation(summary = "자녀 프로필 삭제", description = "자녀 프로필을 삭제합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "자녀 프로필 삭제 성공", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ResponseDto> deleteChildProfile(
            @Parameter(description = "삭제할 자녀의 ID", example = "1") @PathVariable Long childId);

    @Operation(summary = "자녀 프로필 단건 조회", description = "특정 자녀의 프로필을 조회합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "자녀 프로필 조회 성공", content = @Content(schema = @Schema(implementation = ChildDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<ChildDto> getChildProfile(
            @Parameter(description = "조회할 자녀의 ID", example = "1") @PathVariable Long childId);

    @Operation(summary = "자녀 프로필 목록 조회", description = "자녀 프로필 목록을 조회합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "자녀 프로필 조회 성공", content = @Content(schema = @Schema(implementation = ChildDto.class))),
            @ApiResponse(responseCode = "204", description = "자녀 없음", content = @Content),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    public ResponseEntity<List<ChildDto>> getAllChildProfiles();
}
